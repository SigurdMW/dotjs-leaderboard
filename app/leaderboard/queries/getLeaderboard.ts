import { Ctx } from "blitz"
import db, { User } from "db"

interface UserWithPoints extends User {
  points: number
}

interface Leaderboard {
  [userId: number]: UserWithPoints
}

export default async function getLeaderboard(data: {}, ctx: Ctx) {
  ctx.session.authorize()

  const actions = await db.action.findMany({
    include: { activity: true, user: true },
  })

  const userScore = actions.reduce<Leaderboard>((leaderboard, item) => {
    if (leaderboard.hasOwnProperty(item.user.id)) {
      const existingPoints = leaderboard[item.user.id].points
      leaderboard[item.user.id].points = existingPoints + item.activity.points
    } else {
      leaderboard[item.user.id] = {
        ...item.user,
        points: item.activity.points,
      }
    }
    return leaderboard
  }, {})

  const leaderboard: UserWithPoints[] = Object.values(userScore)
  return leaderboard.sort((a, b) => b.points - a.points)
}
