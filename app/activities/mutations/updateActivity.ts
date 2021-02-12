import { Ctx } from "blitz"
import db from "db"
import { ActivityInput, ActivityInputType } from "../validations"

export default async function updateActivity(
  { data, id }: { data: ActivityInputType; id: number },
  ctx: Ctx
) {
  ctx.session.authorize()
  const parsedData = ActivityInput.parse(data)

  const activity = await db.activity.update({
    where: { id: id },
    data: parsedData,
  })

  return activity
}
