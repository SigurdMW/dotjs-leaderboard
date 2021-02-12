import { Ctx } from "blitz"
import db from "db"

export default async function getUsers(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true },
  })

  return users
}
