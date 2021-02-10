import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => (
  <>
    <h1 className="text-6xl mb-10">Create account</h1>
    <SignupForm
      onSuccess={() => {
        window.location.href = "/"
      }}
    />
  </>
)

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
