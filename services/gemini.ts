import "jsr:@std/dotenv/load";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY");

export async function generateSmartSummary(
  title: string,
  description: string,
): Promise<string> {
  if (!GEMINI_KEY) {
    console.error("GEMINI_API_KEY Error. Necesitas API_KEY");
    return description;
  }

  const prompt = `
    Actúa como un periodista deportivo experto en LaLiga.
    Resume la siguiente noticia de fútbol en MÁXIMO 2 FRASES.
    Hazlo emocionante, directo y resalta datos clave (goles, fichajes).
    
    Noticia:
    Título: ${title}
    Contenido: ${description}
  `;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    });

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || description;
  } catch (error) {
    console.error("Error conectando con Gemini:", error);
    return description;
  }
}
