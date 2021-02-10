import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => (
  <LoginForm
    onSuccess={() => {
      window.location.href = "/"
    }}
  />
)

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
