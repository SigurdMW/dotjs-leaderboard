import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { useQuery, BlitzPage } from "blitz"
import getLeaderboard from "app/leaderboard/queries/getLeaderboard"

export const Leaderboard = () => {
  const [leaderboard] = useQuery(getLeaderboard, {})

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Place
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            User
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((row, index) => (
          <tr key={row.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">{row.name || row.email}</p>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                ></span>
                <span className="relative">{row.points}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const LeaderboardPage: BlitzPage = () => (
  <>
    <h1 className="text-6xl  mb-10">Leaderboard</h1>
    <Suspense fallback={<div>Loading...</div>}>
      <Leaderboard />
    </Suspense>
  </>
)

LeaderboardPage.getLayout = (page) => <Layout title="Activities">{page}</Layout>

export default LeaderboardPage
