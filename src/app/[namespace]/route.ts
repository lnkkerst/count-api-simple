import { ensureKey } from "@/utils";

export const dynamic = "force-dynamic";

type Params = {
  namespace: string;
};

export async function GET(_: Request, context: { params: Params; }) {
  const { namespace } = context.params;

  return Response.json({ value: await ensureKey(namespace) });
}
