import { Ctx } from "blitz"
import db from "db"

export default async function getActivity(id: number, ctx: Ctx) {
  ctx.session.authorize()

  const activities = await db.activity.findFirst({
    where: { id },
  })

  return activities
}
