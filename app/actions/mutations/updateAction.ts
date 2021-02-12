import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateActionInput = Pick<Prisma.ActionUpdateArgs, "where" | "data">

export default async function updateAction({ where, data }: UpdateActionInput, ctx: Ctx) {
  ctx.session.authorize()

  const action = await db.action.update({ where, data })

  return action
}
