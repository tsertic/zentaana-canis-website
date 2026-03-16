"use client";

import { useState, useCallback, SetStateAction } from "react";
import { useFormValue, set, unset, PatchEvent } from "sanity";
import {
  Stack,
  Text,
  TextArea,
  Button,
  Card,
  Flex,
  Spinner,
  Badge,
} from "@sanity/ui";

type Props = {
  contentType: "news" | "dog" | "litter";
  onChange: (event: PatchEvent) => void;
  value?: string;
};

export default function AiGenerateField({
  contentType,
  onChange,
  value,
}: Props) {
  const [prompt, setPrompt] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const generate = useCallback(async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setApplied(false);

    try {
      const res = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: contentType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [prompt, contentType]);

  return (
    <Stack space={4}>
      <Card padding={4} radius={2} shadow={1} tone="primary">
        <Stack space={4}>
          <Flex align="center" gap={2}>
            <Text size={1} weight="bold">
              ✨ AI Asistent
            </Text>
            <Badge tone="primary" fontSize={0}>
              Gemini
            </Badge>
          </Flex>

          <Text size={1} muted>
            {contentType === "news" &&
              "Opišite vijest — AI će generirati naslov, tekst i prijevod."}
            {contentType === "dog" &&
              "Opišite psa — AI će generirati biografiju i kratki opis."}
            {contentType === "litter" &&
              "Opišite leglo — AI će generirati naziv, opis i prijevod."}
          </Text>

          <TextArea
            value={prompt}
            onChange={(e: {
              currentTarget: { value: SetStateAction<string> };
            }) => setPrompt(e.currentTarget.value)}
            placeholder={
              contentType === "news"
                ? 'Npr. "Osvojili smo BOB na izložbi u Zagrebu s Rexom, sudac Ivan Horvat, 15.3.2026."'
                : contentType === "dog"
                  ? 'Npr. "Rex je sjajan pas, 3 godine, mužjak, šampion Hrvatske, voli djecu, aktivan..."'
                  : 'Npr. "A leglo, roditelji Rex i Luna, 6 štenaca, rođeni 1.3.2026, sve crni..."'
            }
            rows={4}
            style={{ resize: "vertical" }}
          />

          <Button
            text={loading ? "Generiram..." : "Generiraj s AI"}
            tone="primary"
            icon={loading ? Spinner : undefined}
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{ cursor: loading ? "wait" : "pointer" }}
          />

          {error && (
            <Card padding={3} radius={2} tone="critical">
              <Text size={1}>{error}</Text>
            </Card>
          )}
        </Stack>
      </Card>

      {result && !applied && (
        <Card padding={4} radius={2} shadow={1} tone="positive">
          <Stack space={4}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="bold">
                Generirani sadržaj
              </Text>
              <Badge tone="positive" fontSize={0}>
                Pregled
              </Badge>
            </Flex>

            <Stack space={3}>
              {Object.entries(result).map(([key, val]) => (
                <Card key={key} padding={3} radius={2} tone="default" border>
                  <Stack space={2}>
                    <Text size={0} weight="bold" muted>
                      {key}
                    </Text>
                    <Text
                      size={1}
                      style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "120px",
                        overflow: "auto",
                      }}
                    >
                      {val}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>

            <Text size={1} muted>
              Kliknite "Primijeni" da popunite polja. Možete ih nakon toga ručno
              urediti.
            </Text>
          </Stack>
        </Card>
      )}

      {applied && (
        <Card padding={3} radius={2} tone="positive">
          <Text size={1}>
            ✅ Sadržaj primijenjen! Pregledajte i uredite polja po potrebi.
          </Text>
        </Card>
      )}
    </Stack>
  );
}
