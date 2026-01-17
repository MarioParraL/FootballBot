import "jsr:@std/dotenv/load";

const API_KEY = Deno.env.get("NEWS_API_KEY");

export type Article = {
  title: string;
  url: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
};

export async function getLaLigaNews(): Promise<Article[]> {
  if (!API_KEY) {
    console.error("NEWS_API_KEY ERROR. Necesitas");
    return [];
  }

  const url =
    `https://newsapi.org/v2/everything?q=LaLiga+futbol&language=es&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok") {
      console.error("Error API Noticias:", data.message);
      return [];
    }

    return data.articles.filter((art: any) =>
      art.title && art.url && art.description
    );
  } catch (error) {
    console.error("Error buscando noticias:", error);
    return [];
  }
}
