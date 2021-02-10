import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <>
      <h1 className="text-6xl">dotjs Leaderboard</h1>
      <ul className="list-reset items-center text-sm pt-3">
        <li>
          <Link href="/signup">
            <a className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1 text-base">
              Sign up
            </a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1 text-base">
              Login
            </a>
          </Link>
        </li>
      </ul>
    </>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
