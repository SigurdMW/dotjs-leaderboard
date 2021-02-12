import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createAction from "app/actions/mutations/createAction"
import ActionForm from "app/actions/components/ActionForm"

const NewActionPage: BlitzPage = () => {
  const router = useRouter()
  const [createActionMutation] = useMutation(createAction)

  return (
    <>
      <h1 className="text-6xl mb-10">New action</h1>

      <ActionForm
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const action = await createActionMutation({ data: values })
            router.push(`/actions/${action.id}`)
          } catch (error) {
            alert("Error creating action " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/actions">
          <a>Back to actions</a>
        </Link>
      </p>
    </>
  )
}

NewActionPage.getLayout = (page) => <Layout title={"Create New Action"}>{page}</Layout>

export default NewActionPage
