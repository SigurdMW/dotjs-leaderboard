import { FC, Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import deleteActivity from "app/activities/mutations/deleteActivity"
import getActivity from "app/activities/queries/getActivity"
import ActivityForm from "app/activities/components/ActivityForm"
import updateActivity from "app/activities/mutations/updateActivity"

export const Activity: FC<{ id: number }> = ({ id }) => {
  const router = useRouter()
  const [activity, { refetch }] = useQuery(getActivity, id)
  const [deleteMutation] = useMutation(deleteActivity)
  const [updateMutation] = useMutation(updateActivity)

  if (!activity) return null
  return (
    <div>
      <h1 className="text-6xl mb-10">{activity.name}</h1>

      <div className="mb-10">
        <ActivityForm
          initialValues={{
            name: activity.name,
            description: activity.description || "",
            points: activity.points,
          }}
          onSubmit={async (values) => {
            await updateMutation({ data: values, id })
            await refetch()
          }}
          submitText="Update"
        />
      </div>
      <button
        type="button"
        className="bg-gradient-to-r from-red-800 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        onClick={async () => {
          if (window.confirm(`Delete activity named "${activity.name}"?`)) {
            await deleteMutation(id)
            router.push("/activities")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowEditActivity: BlitzPage = () => {
  const activityId = useParam("activityId", "number")
  if (!activityId) return null
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Activity id={activityId} />
      </Suspense>
      <p className="mt-10">
        <Link href="/activities">
          <a>Back to activites</a>
        </Link>
      </p>
    </div>
  )
}

ShowEditActivity.getLayout = (page) => <Layout title="Show/Edit activity">{page}</Layout>

export default ShowEditActivity
