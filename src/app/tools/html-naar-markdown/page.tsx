"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

export default function HtmlToMarkdown() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = async () => {
    if (!html.trim()) return;
    const TurndownService = (await import("turndown")).default;
    const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
    setMarkdown(td.turndown(html));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="HTML naar Markdown"
      description="Plak je HTML en krijg schone Markdown terug. Handig om webpagina's klaar te maken voor AI-tools."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">HTML invoer</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Plak hier je HTML..."
            rows={10}
            className="mt-1 w-full rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={convert}
          disabled={!html.trim()}
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
                    a.download = "converted.md";
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
