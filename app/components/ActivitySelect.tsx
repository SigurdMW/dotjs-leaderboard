import { Activity } from "db"
import { useQuery } from "blitz"
import React, { FC, PropsWithoutRef, Suspense } from "react"
import { Controller, useFormContext } from "react-hook-form"
import getActivities from "app/activities/queries/getActivities"

export interface ActivitySelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  activities: Array<Activity>
}

export const ActivitySelectField = React.forwardRef<HTMLInputElement, ActivitySelectFieldProps>(
  ({ label, outerProps, name, placeholder, activities, ...props }, ref) => {
    const {
      formState: { isSubmitting },
      control,
      errors,
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps} className="mb-6 max-w-lg">
        <Controller
          control={control}
          name={name}
          render={({ onChange, ...rest }, { invalid, isTouched, isDirty }) => (
            <label className="block w-full mb-1">
              {label}
              <select
                className="text-black block w-full p-1 pl-2 rounded-sm mt-2"
                disabled={isSubmitting}
                aria-invalid={invalid}
                placeholder={placeholder}
                onChange={(e) => {
                  const val = e.target.value
                  if (!isNaN(parseInt(val, 10))) {
                    onChange(parseInt(val, 10))
                  } else {
                    onChange(undefined)
                  }
                }}
                {...rest}
              >
                <option value="">Select</option>
                {activities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        />

        {error && (
          <div role="alert" className="text-red-600">
            {error}
          </div>
        )}
      </div>
    )
  }
)

const ActivitySelectLoader: FC<Omit<ActivitySelectFieldProps, "activities">> = (props) => {
  const [activities] = useQuery(getActivities, {})
  return <ActivitySelectField activities={activities} {...props} />
}

const ActivitySelect: FC<Omit<ActivitySelectFieldProps, "activities">> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ActivitySelectLoader {...props} />
  </Suspense>
)

export default ActivitySelect
