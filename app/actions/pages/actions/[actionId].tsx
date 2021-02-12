import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getAction from "app/actions/queries/getAction"
import deleteAction from "app/actions/mutations/deleteAction"

export const Action = () => {
  const router = useRouter()
  const actionId = useParam("actionId", "number")
  const [action] = useQuery(getAction, { where: { id: actionId } })
  const [deleteActionMutation] = useMutation(deleteAction)

  const displayName = action.user.name || action.user.email
  return (
    <div>
      <h1 className="text-6xl mb-10">{displayName} got points!</h1>
      <p className="mb-2">
        {displayName} got {action.activity.points} points{" "}
        {action.comment && <span>for {action.comment}</span>}
      </p>
      <div className="mb-10">
        <button
          type="button"
          className="bg-gradient-to-r from-red-800 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          onClick={async () => {
            if (window.confirm(`Delete action with id ${action.id}`)) {
              await deleteActionMutation({ where: { id: action.id } })
              router.push("/actions")
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

const ShowActionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Action />
      </Suspense>
      <p className="mt-10">
        <Link href="/actions">
          <a>Back to actions</a>
        </Link>
      </p>
    </div>
  )
}

ShowActionPage.getLayout = (page) => <Layout title={"Action"}>{page}</Layout>

export default ShowActionPage
