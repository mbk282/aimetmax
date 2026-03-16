"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

export default function WordToMarkdown() {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!validTypes.includes(file.type) && !file.name.endsWith(".docx")) {
      alert("Selecteer een Word (.docx) bestand.");
      return;
    }
    setLoading(true);
    setFileName(file.name);
    setMarkdown("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = await import("mammoth");
      const TurndownService = (await import("turndown")).default;
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
      const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
      const md = td.turndown(htmlResult.value);
      setMarkdown(md || "Geen tekst gevonden in dit document.");
    } catch (err) {
      setMarkdown(`Fout bij het verwerken: ${err instanceof Error ? err.message : "Onbekende fout"}`);
    } finally {
      setLoading(false);
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
      title="Word naar Markdown"
      description="Converteer een Word-bestand (.docx) naar Markdown. Alles in je browser, er wordt niks geupload."
    >
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center transition hover:border-blue-400 hover:bg-blue-50"
      >
        <p className="text-sm text-gray-500">
          Sleep een .docx bestand hierheen of{" "}
          <label className="cursor-pointer font-medium text-blue-600 hover:underline">
            kies een bestand
            <input
              type="file"
              accept=".docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        </p>
        <p className="mt-1 text-xs text-gray-400">Word (.docx) bestanden. Je bestand verlaat je browser niet.</p>
      </div>

      {loading && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Bezig met converteren van {fileName}...
        </div>
      )}

      {markdown && !loading && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Resultaat</h2>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {copied ? "Gekopieerd!" : "Kopieer Markdown"}
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([markdown], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = fileName.replace(/\.docx?$/, ".md");
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
    </ToolLayout>
  );
}
