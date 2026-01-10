import { Handlers } from "$fresh/server.ts";
import { runBotUpdate } from "../../services/bot.ts";
import "jsr:@std/dotenv/load";

export const handler: Handlers = {
  async GET(req) {
    // 1. Seguridad: Comprobamos si traen la llave secreta
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    const mySecret = Deno.env.get("CRON_SECRET");

    // Si no traen clave, o la clave es incorrecta -> ¡FUERA!
    if (!secret || secret !== mySecret) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Si la clave es correcta -> EJECUTAMOS EL BOT
    try {
      console.log("⏰ Cron activado desde la web via API...");
      await runBotUpdate();

      return new Response(
        JSON.stringify({
          status: "success",
          message: "Bot ejecutado correctamente",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (_e) {
      return new Response(
        JSON.stringify({ status: "error", message: "error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
