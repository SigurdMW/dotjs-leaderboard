import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "dotjs-leaderboardd"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="/" className="flex w-12 justify-center">
              <span className="text-xl pl-2">
                <img src="/dotjs.svg" alt="dotjs logo" />
              </span>
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"></div>
          <div className="flex w-full content-center justify-between md:w-1/3 md:justify-end"></div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row mt-24">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  )
}

export default Layout
