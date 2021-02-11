import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import React, { Suspense } from "react"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const UnauthLinks = () => (
  <ul className="list-outside list-disc">
    <li className="mb-2 text-lg font-bold underline">
      <Link href="/signup">
        <a className="inline-block no-underline hover:text-gray-100 hover:text-underline py-1 text-base">
          Sign up
        </a>
      </Link>
    </li>
    <li className="mb-2 text-lg font-bold underline">
      <Link href="/login">
        <a className="inline-block no-underline hover:text-gray-100 hover:text-underline py-1 text-base">
          Login
        </a>
      </Link>
    </li>
  </ul>
)

const HeaderLinks = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <ul className="list-outside list-disc">
        <li className="mb-2 text-lg font-bold underline">
          <Link href="/leaderboard">
            <a className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4">
              Leaderboard
            </a>
          </Link>
        </li>
        <li className="mb-2 text-lg font-bold underline">
          <Link href="/activities">
            <a className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4">
              Activities
            </a>
          </Link>
        </li>
        <li className="mb-2 text-lg font-bold underline">
          <Link href="/actions">
            <a className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4">
              Actions
            </a>
          </Link>
        </li>
      </ul>
    )
  }
  return <UnauthLinks />
}

const Home: BlitzPage = () => {
  return (
    <>
      <h1 className="text-6xl mb-10">dotjs Leaderboard</h1>
      <Suspense fallback={<UnauthLinks />}>
        <HeaderLinks />
      </Suspense>
    </>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
