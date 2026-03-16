"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

function rtfToMarkdown(rtf: string): string {
  // Remove header groups like {\fonttbl...}, {\colortbl...}, {\stylesheet...}, {\info...}
  let text = rtf;

  // Remove {\fonttbl...}, {\colortbl...}, {\stylesheet...}, {\info...} groups
  // These are nested brace groups that appear at the start of RTF documents
  const headerGroups = ["fonttbl", "colortbl", "stylesheet", "info", "\\*\\\\generator"];
  for (const group of headerGroups) {
    const regex = new RegExp(`\\{\\\\${group}[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}`, "g");
    text = text.replace(regex, "");
  }

  // Remove {\*\...} groups (extended control words)
  text = text.replace(/\{\\\*\\[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g, "");

  // Handle unicode escapes: \uN? where N is a decimal number and ? is a placeholder char
  text = text.replace(/\\u(-?\d+)\s?\??/g, (_, code) => {
    const num = parseInt(code, 10);
    // RTF uses signed 16-bit, negative values map to 65536 + value
    const charCode = num < 0 ? num + 65536 : num;
    return String.fromCharCode(charCode);
  });

  // Handle hex escapes: \'XX
  text = text.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  // Track bold and italic state for conversion
  // Process \b ... \b0 -> **...**
  // Process \i ... \i0 -> *...*
  // We do this with simple regex replacements on the control words

  // Convert \b to bold markers and \b0 to end bold
  text = text.replace(/\\b\s(?![0-9])/g, "**");
  text = text.replace(/\\b0\s?/g, "**");

  // Convert \i to italic markers and \i0 to end italic
  text = text.replace(/\\i\s(?![0-9])/g, "*");
  text = text.replace(/\\i0\s?/g, "*");

  // Convert \ul (underline) - just strip the markers, no markdown equivalent
  text = text.replace(/\\ul\s?/g, "");
  text = text.replace(/\\ulnone\s?/g, "");
  text = text.replace(/\\ul0\s?/g, "");

  // Convert \tab to spaces
  text = text.replace(/\\tab\s?/g, "    ");

  // Convert \par and \line to newlines
  text = text.replace(/\\par\s?/g, "\n");
  text = text.replace(/\\line\s?/g, "\n");

  // Remove \rtf1, \ansi, \deff, \deflang and other document-level control words
  text = text.replace(/\\rtf\d?\s?/g, "");
  text = text.replace(/\\ansi\s?/g, "");
  text = text.replace(/\\ansicpg\d+\s?/g, "");
  text = text.replace(/\\deff\d+\s?/g, "");
  text = text.replace(/\\deflang\d+\s?/g, "");
  text = text.replace(/\\deflangfe\d+\s?/g, "");
  text = text.replace(/\\uc\d+\s?/g, "");

  // Remove font references: \fN, \fsN, \cfN, \cbN
  text = text.replace(/\\f\d+\s?/g, "");
  text = text.replace(/\\fs\d+\s?/g, "");
  text = text.replace(/\\cf\d+\s?/g, "");
  text = text.replace(/\\cb\d+\s?/g, "");
  text = text.replace(/\\highlight\d+\s?/g, "");

  // Remove paragraph formatting control words
  text = text.replace(/\\pard\s?/g, "");
  text = text.replace(/\\plain\s?/g, "");
  text = text.replace(/\\widctlpar\s?/g, "");
  text = text.replace(/\\nowidctlpar\s?/g, "");
  text = text.replace(/\\sl-?\d+\s?/g, "");
  text = text.replace(/\\slmult\d+\s?/g, "");
  text = text.replace(/\\sa\d+\s?/g, "");
  text = text.replace(/\\sb\d+\s?/g, "");
  text = text.replace(/\\li\d+\s?/g, "");
  text = text.replace(/\\ri\d+\s?/g, "");
  text = text.replace(/\\fi-?\d+\s?/g, "");
  text = text.replace(/\\qc\s?/g, "");
  text = text.replace(/\\qr\s?/g, "");
  text = text.replace(/\\qj\s?/g, "");
  text = text.replace(/\\ql\s?/g, "");
  text = text.replace(/\\tx\d+\s?/g, "");
  text = text.replace(/\\tqc\s?/g, "");
  text = text.replace(/\\tqr\s?/g, "");

  // Remove section/page control words
  text = text.replace(/\\sectd\s?/g, "");
  text = text.replace(/\\sect\s?/g, "");
  text = text.replace(/\\page\s?/g, "\n\n---\n\n");
  text = text.replace(/\\pagebb\s?/g, "");

  // Remove margin/paper control words
  text = text.replace(/\\margl?\d+\s?/g, "");
  text = text.replace(/\\margr?\d+\s?/g, "");
  text = text.replace(/\\margt?\d+\s?/g, "");
  text = text.replace(/\\margb?\d+\s?/g, "");
  text = text.replace(/\\paperw\d+\s?/g, "");
  text = text.replace(/\\paperh\d+\s?/g, "");
  text = text.replace(/\\viewkind\d+\s?/g, "");

  // Remove lang control words
  text = text.replace(/\\lang\d+\s?/g, "");
  text = text.replace(/\\langfe\d+\s?/g, "");
  text = text.replace(/\\langnp\d+\s?/g, "");

  // Remove kerning and spacing
  text = text.replace(/\\kerning\d+\s?/g, "");
  text = text.replace(/\\expndtw-?\d+\s?/g, "");

  // Remove any remaining control words we haven't explicitly handled
  text = text.replace(/\\[a-z]+\d*\s?/g, "");

  // Remove braces
  text = text.replace(/[{}]/g, "");

  // Clean up excessive whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.trim();

  return text;
}

export default function RtfToMarkdown() {
  const [rtf, setRtf] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");

  const convert = () => {
    if (!rtf.trim()) return;
    setMarkdown(rtfToMarkdown(rtf));
  };

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setRtf(text);
    setMarkdown(rtfToMarkdown(text));
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
      title="RTF naar Markdown"
      description="Converteer RTF bestanden naar Markdown. Alles draait in je browser, je bestanden worden niet geupload."
    >
      <div className="space-y-4">
        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
        >
          <p className="text-sm text-gray-500">
            Sleep een RTF bestand hierheen of{" "}
            <label className="cursor-pointer font-medium text-blue-600 hover:underline">
              kies een bestand
              <input
                type="file"
                accept=".rtf"
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
            Of plak je RTF inhoud hier
          </label>
          <textarea
            value={rtf}
            onChange={(e) => setRtf(e.target.value)}
            placeholder={"{\\rtf1\\ansi Voorbeeld \\b vetgedrukt\\b0  en \\i cursief\\i0  tekst.\\par Nieuwe regel.}"}
            rows={8}
            className="mt-1 w-full rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={convert}
          disabled={!rtf.trim()}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Converteer naar Markdown
        </button>

        {markdown && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Resultaat{fileName ? ` - ${fileName}` : ""}
              </h2>
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
                    a.download = (fileName || "document").replace(/\.rtf$/i, "") + ".md";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Download .md
                </button>
              </div>
            </div>
            <pre className="mt-3 max-h-[400px] overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
              {markdown}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
