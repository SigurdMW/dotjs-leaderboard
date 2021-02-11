import { Ctx } from "blitz"
import db from "db"
import { ActivityInput, ActivityInputType } from "../validations"

export default async function createActivity(data: ActivityInputType, ctx: Ctx) {
  ctx.session.authorize()
  const parsedData = ActivityInput.parse(data)

  const activity = await db.activity.create({
    data: {
      ...parsedData,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return activity
}
