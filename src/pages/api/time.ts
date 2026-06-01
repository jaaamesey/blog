import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ time: new Date().toISOString() }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
