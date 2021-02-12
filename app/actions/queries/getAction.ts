import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetActionInput = Pick<Prisma.FindFirstActionArgs, "where">

export default async function getAction({ where }: GetActionInput, ctx: Ctx) {
  ctx.session.authorize()

  const action = await db.action.findFirst({ where, include: { user: true, activity: true } })

  if (!action) throw new NotFoundError()

  return action
}
