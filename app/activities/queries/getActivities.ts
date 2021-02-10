import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetActivitiesInput = Pick<Prisma.FindManyActivityArgs, "where" | "orderBy" | "skip" | "take">

export default async function getActivities({ where, orderBy }: GetActivitiesInput, ctx: Ctx) {
  ctx.session.authorize()

  const activities = await db.activity.findMany({
    where,
    orderBy,
  })

  return activities
}
