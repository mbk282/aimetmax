"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

function csvToMarkdownTable(csvText: string, delimiter: string): string {
  const Papa = require("papaparse");
  const parsed = Papa.parse(csvText.trim(), { delimiter: delimiter === "auto" ? undefined : delimiter });
  const rows: string[][] = parsed.data;

  if (rows.length === 0) return "Geen data gevonden.";

  const header = rows[0];
  const divider = header.map(() => "---");
  const body = rows.slice(1).filter((row: string[]) => row.some((cell) => cell.trim()));

  const formatRow = (row: string[]) => `| ${row.join(" | ")} |`;

  return [formatRow(header), formatRow(divider), ...body.map(formatRow)].join("\n");
}

export default function CsvToMarkdown() {
  const [csv, setCsv] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState("auto");
  const [fileName, setFileName] = useState("");

  const convert = () => {
    if (!csv.trim()) return;
    setMarkdown(csvToMarkdownTable(csv, delimiter));
  };

  const handleFile = useCallback(
    async (file: File) => {
      setFileName(file.name);
      const text = await file.text();
      setCsv(text);
      setMarkdown(csvToMarkdownTable(text, delimiter));
    },
    [delimiter]
  );

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
      title="CSV naar Markdown Tabel"
      description="Converteer CSV of TSV data naar een nette Markdown tabel. Handig om spreadsheetdata klaar te maken voor AI."
    >
      <div className="space-y-4">
        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-card p-8 text-center transition hover:border-accent hover:bg-accent-soft"
        >
          <p className="text-sm text-ink-soft">
            Sleep een CSV/TSV bestand hierheen of{" "}
            <label className="cursor-pointer font-medium text-accent hover:underline">
              kies een bestand
              <input
                type="file"
                accept=".csv,.tsv,.txt"
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
          <label className="block text-sm font-medium text-ink-soft">
            Of plak je CSV data hier
          </label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder={"Naam,Email,Rol\nJan,jan@voorbeeld.nl,Manager\nPiet,piet@voorbeeld.nl,Developer"}
            rows={8}
            className="mt-1 w-full rounded-xl border border-line p-4 font-mono text-sm text-ink focus:border-accent focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-soft">Scheidingsteken</label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="mt-1 rounded-lg border border-line px-3 py-2 text-sm"
            >
              <option value="auto">Automatisch</option>
              <option value=",">Komma (,)</option>
              <option value=";">Puntkomma (;)</option>
              <option value="	">Tab</option>
            </select>
          </div>
          <button
            onClick={convert}
            disabled={!csv.trim()}
            className="mt-5 rounded-lg bg-accent px-6 py-2.5 font-medium text-white hover:bg-accent-dark disabled:opacity-50"
          >
            Converteer
          </button>
        </div>

        {markdown && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">Resultaat</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
                >
                  {copied ? "Gekopieerd!" : "Kopieer"}
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([markdown], { type: "text/markdown" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = (fileName || "tabel").replace(/\.(csv|tsv|txt)$/, "") + ".md";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-card"
                >
                  Download .md
                </button>
              </div>
            </div>
            <pre className="mt-3 max-h-[400px] overflow-auto rounded-xl border border-line bg-card p-4 text-sm text-ink whitespace-pre-wrap">
              {markdown}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
