"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

function xmlToMarkdown(xmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    return "**Fout bij het parsen van XML:**\n\n" + parseError.textContent;
  }

  const lines: string[] = [];

  function processNode(node: Node, depth: number) {
    if (node.nodeType === Node.CDATA_SECTION_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        lines.push("");
        lines.push("```");
        lines.push(text);
        lines.push("```");
        lines.push("");
      }
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        lines.push("");
        lines.push(text);
        lines.push("");
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as Element;
    const tagName = el.tagName;
    const headingLevel = Math.min(depth, 6);

    // Check if siblings with the same name exist (list rendering)
    const parent = el.parentElement;
    const isSiblingList =
      parent &&
      Array.from(parent.children).filter((c) => c.tagName === tagName).length > 1;

    const childElements = Array.from(el.children);
    const hasChildElements = childElements.length > 0;
    const directText = Array.from(el.childNodes)
      .filter(
        (n) =>
          n.nodeType === Node.TEXT_NODE || n.nodeType === Node.CDATA_SECTION_NODE
      )
      .map((n) => n.textContent?.trim())
      .filter(Boolean)
      .join(" ");

    if (isSiblingList && !hasChildElements) {
      // Render as bullet list item
      let bullet = `- **${tagName}:** ${directText}`;

      // Add attributes inline
      if (el.attributes.length > 0) {
        const attrs = Array.from(el.attributes)
          .map((a) => `**${a.name}:** ${a.value}`)
          .join(" | ");
        bullet = `- **${tagName}:** ${directText} (${attrs})`;
      }

      lines.push(bullet);
      return;
    }

    // Render as heading
    const heading = "#".repeat(headingLevel);
    lines.push("");
    lines.push(`${heading} ${tagName}`);
    lines.push("");

    // Render attributes
    if (el.attributes.length > 0) {
      for (const attr of Array.from(el.attributes)) {
        lines.push(`**${attr.name}:** ${attr.value}`);
      }
      lines.push("");
    }

    // Render direct text content
    if (directText) {
      lines.push(directText);
      lines.push("");
    }

    // Process child nodes (preserving order, handling CDATA)
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.CDATA_SECTION_NODE) {
        processNode(child, depth + 1);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        processNode(child, depth + 1);
      }
    }
  }

  // Start from document element
  if (doc.documentElement) {
    processNode(doc.documentElement, 1);
  }

  // Clean up excessive blank lines
  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function XmlToMarkdown() {
  const [xml, setXml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");

  const convert = () => {
    if (!xml.trim()) return;
    setMarkdown(xmlToMarkdown(xml));
  };

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setXml(text);
    setMarkdown(xmlToMarkdown(text));
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
      title="XML naar Markdown"
      description="Converteer XML naar leesbare Markdown. Handig om XML-documenten klaar te maken voor AI-tools."
    >
      <div className="space-y-4">
        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
        >
          <p className="text-sm text-gray-500">
            Sleep een XML bestand hierheen of{" "}
            <label className="cursor-pointer font-medium text-blue-600 hover:underline">
              kies een bestand
              <input
                type="file"
                accept=".xml"
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
            Of plak je XML hier
          </label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            placeholder={`<?xml version="1.0" encoding="UTF-8"?>
<project>
  <name>Mijn Project</name>
  <version>1.0</version>
  <dependencies>
    <dependency>React</dependency>
    <dependency>Next.js</dependency>
  </dependencies>
</project>`}
            rows={10}
            className="mt-1 w-full rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={convert}
          disabled={!xml.trim()}
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
                    const blob = new Blob([markdown], {
                      type: "text/markdown",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download =
                      (fileName || "document").replace(/\.xml$/, "") + ".md";
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
