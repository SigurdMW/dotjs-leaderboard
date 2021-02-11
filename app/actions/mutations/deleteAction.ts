import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteActionInput = Pick<Prisma.ActionDeleteArgs, "where">

export default async function deleteAction({ where }: DeleteActionInput, ctx: Ctx) {
  ctx.session.authorize()

  const action = await db.action.delete({ where })

  return action
}
