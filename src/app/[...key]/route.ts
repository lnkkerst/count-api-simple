import { ensureKey, kvPrefix } from "@/utils";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

type Params = {
  key: string[];
};

export async function GET(_: Request, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const value = await ensureKey(key);

  return Response.json({ value });
}

export async function POST(_: Request, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const namespace = context.params.key[0];
  await kv.incr(`${kvPrefix}${namespace}`);
  const value = await kv.incr(`${kvPrefix}${key}`);

  return Response.json({ value });
}
