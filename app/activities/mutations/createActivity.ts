import { Ctx } from "blitz"
import db from "db"
import { ActivityInput, ActivityInputType } from "../validations"

export default async function createActivity(data: ActivityInputType, ctx: Ctx) {
  ctx.session.authorize()
  const parsedData = ActivityInput.parse(data)

  const points = parseInt(parsedData.points, 10)

  const activity = await db.activity.create({
    data: {
      ...parsedData,
      points,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return activity
}
