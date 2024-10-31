import { ensureKey, kvPrefix } from "@/utils";
import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
  key: string[];
};

export async function GET(request: NextRequest, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const hit = request.nextUrl.searchParams.get("hit");
  let value = 0;
  if (hit !== null) {
    const namespace = context.params.key[0];
    await kv.incr(`${kvPrefix}${namespace}`);
    value = await kv.incr(`${kvPrefix}${key}`);
  } else {
    value = await ensureKey(key);
  }

  return Response.json({ value });
}

export async function POST(_: Request, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const namespace = context.params.key[0];
  await kv.incr(`${kvPrefix}${namespace}`);
  const value = await kv.incr(`${kvPrefix}${key}`);

  return Response.json({ value });
}
