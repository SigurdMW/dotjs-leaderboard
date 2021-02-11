import React, { PropsWithoutRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, type, name, placeholder, ...props }, ref) => {
    const {
      register,
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
              <input
                disabled={isSubmitting}
                type={type}
                aria-invalid={invalid}
                onChange={(v) => {
                  const value = v.target.value
                  if (type === "number") {
                    onChange(parseInt(value, 10))
                  } else {
                    onChange(value)
                  }
                }}
                placeholder={placeholder}
                className="w-full p-1 pl-2 rounded-sm mt-2 text-black"
                {...rest}
              />
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

export default LabeledTextField
