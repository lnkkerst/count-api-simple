import { kv } from "@vercel/kv";

type Params = {
  key: string[];
};

export async function GET(_: Request, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const dbValue = await kv.get(key);
  let value: number;

  if (typeof dbValue !== "number") {
    kv.set(key, 0);
    value = 0;
  } else {
    value = dbValue;
  }

  return Response.json({ value });
}

export async function POST(_: Request, context: { params: Params; }) {
  const key = context.params.key.join("/");
  const value = await kv.incr(key);
  return Response.json({ value });
}
