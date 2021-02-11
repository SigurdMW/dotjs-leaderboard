import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetActionsInput = Pick<Prisma.FindManyActionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getActions({ where, orderBy }: GetActionsInput, ctx: Ctx) {
  ctx.session.authorize()

  const actions = await db.action.findMany({
    where,
    orderBy,
    include: { user: true },
  })

  return {
    actions,
  }
}
