import { Ctx, NotFoundError } from "blitz"
import db from "db"
import { ActionInput, ActionInputType } from "../validations"

type CreateActionInput = {
  data: ActionInputType
}

export default async function createAction({ data }: CreateActionInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const { comment, activityId, userId } = ActionInput.parse(data)

  // Make sure the given activity and user exist
  const [user, activity] = await Promise.all([
    db.user.findUnique({ where: { id: data.userId } }),
    db.activity.findUnique({ where: { id: data.activityId } }),
  ])

  if (!user || !activity) throw new NotFoundError("User or activity not found")

  const action = await db.action.create({
    data: {
      activity: {
        connect: { id: activityId },
      },
      user: {
        connect: { id: userId },
      },
      createdByUser: {
        connect: { id: ctx.session.userId },
      },
      comment,
    },
  })

  return action
}
