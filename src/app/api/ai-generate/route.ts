import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `Ti si asistent za uzgajivačnicu pasa "Zentaana Canis" (FCI 19/25). 
Tvoj zadatak je generirati sadržaj za web stranicu na temelju kratkog opisa korisnika.

UVIJEK odgovori ISKLJUČIVO s validnim JSON objektom, bez markdown oznaka, bez backtickova, bez ikakvog teksta prije ili poslije JSON-a.

Struktura JSON-a:
{
  "title_hr": "Naslov na hrvatskom",
  "title_en": "Title in English",
  "excerpt_hr": "Kratki opis na hrvatskom (1-2 rečenice)",
  "excerpt_en": "Short description in English (1-2 sentences)",
  "body_hr": "Puni tekst članka na hrvatskom (3-5 paragrafa, odvojenih s \\n\\n)",
  "body_en": "Full article text in English (3-5 paragraphs, separated by \\n\\n)",
  "category": "jedna od: shows, litters, results, health, general"
}

Pravila:
- Hrvatski tekst mora biti gramatički ispravan i prirodan
- Engleski tekst nije doslovan prijevod, već prilagođena verzija
- Kategoriju odredi prema sadržaju (izložbe=shows, legla=litters, rezultati testova=results, zdravlje=health, ostalo=general)
- Ton je profesionalan ali topao, prikladan za uzgajivačnicu
- Nemoj izmišljati informacije koje nisu u promptu
- Puni tekst neka bude informativan i zanimljiv`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI API key not configured" },
        { status: 500 },
      );
    }

    const { prompt, type } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    let typeInstruction = "";
    if (type === "dog") {
      typeInstruction = `Generiraj sadržaj za profil psa. JSON struktura:
{
  "shortDescription_hr": "Kratki opis psa (2-3 rečenice)",
  "shortDescription_en": "Short description (2-3 sentences)",
  "bio_hr": "Detaljna biografija na hrvatskom (3-5 paragrafa, odvojenih s \\n\\n)",
  "bio_en": "Detailed biography in English (3-5 paragraphs, separated by \\n\\n)"
}`;
    } else if (type === "litter") {
      typeInstruction = `Generiraj sadržaj za leglo. JSON struktura:
{
  "name_hr": "Naziv legla na hrvatskom",
  "name_en": "Litter name in English",
  "shortDescription_hr": "Kratki opis legla (1-2 rečenice)",
  "shortDescription_en": "Short litter description (1-2 sentences)",
  "description_hr": "Detaljni opis legla na hrvatskom (2-4 paragrafa, odvojenih s \\n\\n)",
  "description_en": "Detailed litter description in English (2-4 paragraphs, separated by \\n\\n)"
}`;
    }

    const finalPrompt = typeInstruction
      ? `${typeInstruction}\n\nKorisnikov opis:\n${prompt}`
      : `${SYSTEM_PROMPT}\n\nKorisnikov opis:\n${prompt}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
    });

    const result = await model.generateContent(finalPrompt);
    const response = result.response;
    const text = response.text();

    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: error.message || "AI generation failed" },
      { status: 500 },
    );
  }
}
