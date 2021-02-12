import { Ctx } from "blitz"
import db from "db"

export default async function deleteActivity(id: number, ctx: Ctx) {
  ctx.session.authorize()

  await db.activity.delete({
    where: { id },
  })
}
