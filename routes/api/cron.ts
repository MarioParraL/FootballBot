import { Handlers } from "$fresh/server.ts";
import { runBotUpdate } from "../../services/bot.ts";
import "jsr:@std/dotenv/load";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    const mySecret = Deno.env.get("CRON_KEY");

    if (!key || key !== mySecret) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    try {
      console.log("Cron activado");
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
        JSON.stringify({ status: "error", message: "error en el cron" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};

      );
    }
  },
};
