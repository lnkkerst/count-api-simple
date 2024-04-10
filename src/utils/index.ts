import { kv } from "@vercel/kv";

export const kvPrefix = "count-api:";

export async function ensureKey(key: string) {
  const dbValue = await kv.get(`${kvPrefix}${key}`);
  let value: number;

  if (typeof dbValue !== "number") {
    kv.set(`${kvPrefix}${key}`, 0);
    value = 0;
  } else {
    value = dbValue;
  }

  return value;
}
