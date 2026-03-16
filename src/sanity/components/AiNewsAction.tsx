"use client";

import { useState, useCallback } from "react";
import { useDocumentOperation } from "sanity";
import {
  Stack,
  Text,
  TextArea,
  Button,
  Card,
  Flex,
  Badge,
  Dialog,
} from "@sanity/ui";

function textToPortableText(text: string) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((paragraph, i) => ({
      _type: "block",
      _key: `ai_block_${i}_${Date.now()}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `ai_span_${i}_${Date.now()}`,
          text: paragraph.trim(),
          marks: [],
        },
      ],
    }));
}

export function AiNewsAction(props: any) {
  const { id, type, published, draft } = props;
  const { patch } = useDocumentOperation(id, type);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contentType =
    type === "dog" ? "dog" : type === "litter" ? "litter" : "news";

  const generate = useCallback(async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: contentType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [prompt, contentType]);

  const apply = useCallback(() => {
    if (!result) return;

    if (contentType === "news") {
      patch.execute([
        { set: { title_hr: result.title_hr } },
        { set: { title_en: result.title_en } },
        { set: { excerpt_hr: result.excerpt_hr } },
        { set: { excerpt_en: result.excerpt_en } },
        { set: { category: result.category } },
        { set: { body_hr: textToPortableText(result.body_hr) } },
        { set: { body_en: textToPortableText(result.body_en) } },
      ]);
    } else if (contentType === "dog") {
      patch.execute([
        { set: { shortDescription_hr: result.shortDescription_hr } },
        { set: { shortDescription_en: result.shortDescription_en } },
        { set: { bio_hr: textToPortableText(result.bio_hr) } },
        { set: { bio_en: textToPortableText(result.bio_en) } },
      ]);
    } else if (contentType === "litter") {
      patch.execute([
        { set: { name_hr: result.name_hr } },
        { set: { name_en: result.name_en } },
        { set: { shortDescription_hr: result.shortDescription_hr } },
        { set: { shortDescription_en: result.shortDescription_en } },
        { set: { description_hr: textToPortableText(result.description_hr) } },
        { set: { description_en: textToPortableText(result.description_en) } },
      ]);
    }

    setIsOpen(false);
    setResult(null);
    setPrompt("");
  }, [result, patch, contentType]);

  return {
    label: "✨ AI Generiraj",
    tone: "primary" as const,
    onHandle: () => setIsOpen(true),
    dialog: isOpen
      ? {
          type: "dialog" as const,
          onClose: () => {
            setIsOpen(false);
            setResult(null);
            setError(null);
          },
          header: "✨ AI Asistent",
          content: (
            <Stack space={4} padding={4}>
              <Text size={1} muted>
                {contentType === "news" &&
                  "Opišite vijest — AI će generirati naslov, tekst i prijevod na oba jezika."}
                {contentType === "dog" &&
                  "Opišite psa — AI će generirati biografiju i kratki opis na oba jezika."}
                {contentType === "litter" &&
                  "Opišite leglo — AI će generirati naziv, opis i prijevod na oba jezika."}
              </Text>

              <TextArea
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
                placeholder={
                  contentType === "news"
                    ? 'Npr. "Osvojili smo BOB na izložbi u Zagrebu s Rexom..."'
                    : contentType === "dog"
                      ? 'Npr. "Rex, 3 godine, mužjak, šampion Hrvatske..."'
                      : 'Npr. "A leglo, roditelji Rex i Luna, 6 štenaca..."'
                }
                rows={5}
                style={{ resize: "vertical" }}
              />

              <Button
                text={loading ? "Generiram..." : "Generiraj"}
                tone="primary"
                onClick={generate}
                disabled={loading || !prompt.trim()}
                style={{ cursor: loading ? "wait" : "pointer" }}
              />

              {error && (
                <Card padding={3} radius={2} tone="critical">
                  <Text size={1}>{error}</Text>
                </Card>
              )}

              {result && (
                <Stack space={4}>
                  <Card padding={4} radius={2} tone="positive" border>
                    <Stack space={3}>
                      <Text size={1} weight="bold">
                        Pregled generiranog sadržaja:
                      </Text>
                      {Object.entries(result).map(([key, val]) => (
                        <Card
                          key={key}
                          padding={3}
                          radius={2}
                          tone="default"
                          border
                        >
                          <Stack space={2}>
                            <Text size={0} weight="bold" muted>
                              {key}
                            </Text>
                            <Text
                              size={1}
                              style={{
                                whiteSpace: "pre-wrap",
                                maxHeight: "100px",
                                overflow: "auto",
                              }}
                            >
                              {typeof val === "string" && val.length > 200
                                ? val.slice(0, 200) + "..."
                                : val}
                            </Text>
                          </Stack>
                        </Card>
                      ))}
                    </Stack>
                  </Card>

                  <Flex gap={3}>
                    <Button
                      text="Primijeni na dokument"
                      tone="positive"
                      onClick={apply}
                      style={{ cursor: "pointer" }}
                    />
                    <Button
                      text="Generiraj ponovo"
                      mode="ghost"
                      onClick={generate}
                      disabled={loading}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Stack>
              )}
            </Stack>
          ),
        }
      : null,
  };
}
