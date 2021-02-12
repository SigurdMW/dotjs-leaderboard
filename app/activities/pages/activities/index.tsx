import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useQuery, BlitzPage } from "blitz"
import getActivities from "app/activities/queries/getActivities"

const NewActivity = () => (
  <Link href="/activities/new">
    <a className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
      New activity
    </a>
  </Link>
)

export const ActivityList = () => {
  const [activities] = useQuery(getActivities, {
    orderBy: { id: "asc" },
  })

  return (
    <ul className="list-outside list-disc">
      {activities.length ? (
        <>
          {activities.map((activity) => (
            <li key={activity.id} className="mb-2 text-lg font-bold underline">
              <Link href={`/activities/${activity.id}`}>
                <a>{activity.name}</a>
              </Link>
            </li>
          ))}
        </>
      ) : (
        <li>
          <div className="mb-4">There are no activities yet.</div>
          <NewActivity />
        </li>
      )}
    </ul>
  )
}

const ActivitiesPage: BlitzPage = () => (
  <>
    <div className="flex justify-between mb-10 items-center">
      <h1 className="text-6xl">Activities</h1>
      <NewActivity />
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <ActivityList />
    </Suspense>
  </>
)

ActivitiesPage.getLayout = (page) => <Layout title="Activities">{page}</Layout>

export default ActivitiesPage
