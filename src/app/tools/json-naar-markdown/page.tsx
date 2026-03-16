"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

function jsonToMarkdown(value: unknown, headingLevel: number = 2): string {
  if (value === null || value === undefined) return "_null_";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    // Check if array of objects with shared keys -> render as table
    if (
      value.length > 0 &&
      value.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))
    ) {
      const allKeys = Array.from(new Set(value.flatMap((item) => Object.keys(item as Record<string, unknown>))));
      if (allKeys.length > 0) {
        const header = `| ${allKeys.join(" | ")} |`;
        const divider = `| ${allKeys.map(() => "---").join(" | ")} |`;
        const rows = value.map((item) => {
          const obj = item as Record<string, unknown>;
          return `| ${allKeys.map((k) => {
            const v = obj[k];
            if (v === null || v === undefined) return "";
            if (typeof v === "object") return JSON.stringify(v);
            return String(v);
          }).join(" | ")} |`;
        });
        return [header, divider, ...rows].join("\n");
      }
    }

    // Regular array -> numbered list
    return value
      .map((item, i) => {
        const content = jsonToMarkdown(item, headingLevel + 1);
        if (typeof item === "object" && item !== null) {
          return `${i + 1}. \n${content.split("\n").map((line) => `   ${line}`).join("\n")}`;
        }
        return `${i + 1}. ${content}`;
      })
      .join("\n");
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const prefix = "#".repeat(Math.min(headingLevel, 6));
    return Object.entries(obj)
      .map(([key, val]) => {
        if (val === null || val === undefined) {
          return `**${key}:** _null_`;
        }
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
          return `**${key}:** ${String(val)}`;
        }
        if (Array.isArray(val)) {
          // Array of objects with shared keys -> table under heading
          if (
            val.length > 0 &&
            val.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))
          ) {
            return `${prefix} ${key}\n\n${jsonToMarkdown(val, headingLevel + 1)}`;
          }
          return `${prefix} ${key}\n\n${jsonToMarkdown(val, headingLevel + 1)}`;
        }
        // Nested object
        return `${prefix} ${key}\n\n${jsonToMarkdown(val, headingLevel + 1)}`;
      })
      .join("\n\n");
  }

  return String(value);
}

export default function JsonToMarkdown() {
  const [json, setJson] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const convert = () => {
    if (!json.trim()) return;
    try {
      const parsed = JSON.parse(json);
      setError("");
      setMarkdown(jsonToMarkdown(parsed));
    } catch {
      setError("Ongeldige JSON. Controleer de syntax en probeer opnieuw.");
      setMarkdown("");
    }
  };

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setJson(text);
    try {
      const parsed = JSON.parse(text);
      setError("");
      setMarkdown(jsonToMarkdown(parsed));
    } catch {
      setError("Ongeldige JSON in bestand. Controleer de syntax.");
      setMarkdown("");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="JSON naar Markdown"
      description="Converteer JSON naar leesbare Markdown. Handig om API-responses of config bestanden klaar te maken voor AI-tools."
    >
      <div className="space-y-4">
        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
        >
          <p className="text-sm text-gray-500">
            Sleep een JSON bestand hierheen of{" "}
            <label className="cursor-pointer font-medium text-blue-600 hover:underline">
              kies een bestand
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
          </p>
        </div>

        {/* Text input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Of plak je JSON hier
          </label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder={'{\n  "naam": "Jan de Vries",\n  "functie": "Developer",\n  "vaardigheden": ["Python", "JavaScript", "SQL"],\n  "ervaring": {\n    "jaren": 5,\n    "bedrijf": "TechCorp"\n  }\n}'}
            rows={10}
            className="mt-1 w-full rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={convert}
          disabled={!json.trim()}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Converteer naar Markdown
        </button>

        {markdown && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Resultaat</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {copied ? "Gekopieerd!" : "Kopieer"}
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([markdown], { type: "text/markdown" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = (fileName || "converted").replace(/\.json$/, "") + ".md";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Download .md
                </button>
              </div>
            </div>
            <pre className="mt-3 max-h-[500px] overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
              {markdown}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
