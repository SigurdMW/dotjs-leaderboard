import React, { FC } from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form } from "app/components/Form"
import { ActionInputType, ActionInput } from "../validations"

type ActionFormProps = {
  initialValues: Partial<ActionInputType>
  onSubmit: (values: ActionInputType) => any
  submitText?: string
}

export const ActionForm: FC<ActionFormProps> = (props) => {
  return (
    <Form submitText={props.submitText || "Create"} schema={ActionInput} {...props}>
      <LabeledTextField name="userId" label="User" placeholder="User" type="number" />
      <LabeledTextField name="activityId" label="Activity" placeholder="Activity" type="number" />
      <LabeledTextField name="comment" label="Comment" placeholder="Comment" type="text" />
    </Form>
  )
}
export default ActionForm
