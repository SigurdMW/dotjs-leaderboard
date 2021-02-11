import React, { FC } from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form } from "app/components/Form"
import { ActionInputType, ActionInput } from "../validations"
import UserSelect from "app/components/UserSelect"
import ActivitySelect from "app/components/ActivitySelect"

type ActionFormProps = {
  initialValues: Partial<ActionInputType>
  onSubmit: (values: ActionInputType) => any
  submitText?: string
}

export const ActionForm: FC<ActionFormProps> = (props) => {
  return (
    <Form submitText={props.submitText || "Create"} schema={ActionInput} {...props}>
      <UserSelect name="userId" label="User" placeholder="User" />
      <ActivitySelect name="activityId" label="Activity" placeholder="Activity" />
      <LabeledTextField name="comment" label="Comment" placeholder="Comment" type="text" />
    </Form>
  )
}
export default ActionForm
