import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, BlitzPage, useQuery } from "blitz"
import getActions from "app/actions/queries/getActions"

const NewAction = () => (
  <Link href="/actions/new">
    <a className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
      New action
    </a>
  </Link>
)

export const ActionsList = () => {
  const [{ actions }] = useQuery(getActions, {
    orderBy: { id: "asc" },
  })

  return (
    <ul className="list-outside list-disc">
      <>
        {actions.length ? (
          <>
            {actions.map((action) => (
              <li key={action.id} className="mb-2 text-lg font-bold underline">
                <Link href={`/actions/${action.id}`}>
                  <a>{action.user.name || action.user.email} got points!</a>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <li>
            <div className="mb-4">There are no actions yet.</div>
            <NewAction />
          </li>
        )}
      </>
    </ul>
  )
}

const ActionsPage: BlitzPage = () => {
  return (
    <div>
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-6xl">Actions</h1>
        <NewAction />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ActionsList />
      </Suspense>
    </div>
  )
}

ActionsPage.getLayout = (page) => <Layout title={"Actions"}>{page}</Layout>

export default ActionsPage
