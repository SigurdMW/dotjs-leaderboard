import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createActivity from "app/activities/mutations/createActivity"
import ActivityForm from "app/activities/components/ActivityForm"
import { FORM_ERROR } from "app/components/Form"

const NewActivityPage: BlitzPage = () => {
  const router = useRouter()
  const [createActivityMutation] = useMutation(createActivity)
  return (
    <>
      <h1 className="text-6xl mb-10">New activity</h1>
      <ActivityForm
        initialValues={{ name: "", points: 0, description: "" }}
        onSubmit={async (values) => {
          try {
            const activity = await createActivityMutation(values)
            router.push(`/activities/${activity.id}`)
          } catch (error) {
            return {
              [FORM_ERROR]: error.message || error.toString(),
            }
          }
        }}
      />

      <p className="mt-10">
        <Link href="/activities">
          <a>Back to all activities</a>
        </Link>
      </p>
    </>
  )
}

NewActivityPage.getLayout = (page) => <Layout title={"Create New Test"}>{page}</Layout>

export default NewActivityPage
