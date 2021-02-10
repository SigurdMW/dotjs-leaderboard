import React, { FC } from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form } from "app/components/Form"
import { ActivityInput, ActivityInputType } from "../validations"

type ActivityFormProps = {
  onSubmit: (value: ActivityInputType) => any
  initialValues: ActivityInputType
  submitText?: string
}

export const ActivityForm: FC<ActivityFormProps> = (props) => {
  return (
    <Form submitText={props.submitText || "Create"} schema={ActivityInput} {...props}>
      <LabeledTextField name="name" label="Activity name" placeholder="Name" />
      <LabeledTextField name="points" label="Points" placeholder="Points" type="number" />
    </Form>
  )
}

export default ActivityForm
