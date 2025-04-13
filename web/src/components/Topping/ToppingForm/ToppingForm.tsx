import type { EditToppingById, UpdateToppingInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormTopping = NonNullable<EditToppingById['topping']>

interface ToppingFormProps {
  topping?: EditToppingById['topping']
  onSave: (data: UpdateToppingInput, id?: FormTopping['id']) => void
  error: RWGqlError
  loading: boolean
}

const ToppingForm = (props: ToppingFormProps) => {
  const onSubmit = (data: FormTopping) => {
    props.onSave(data, props?.topping?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTopping> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.topping?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ToppingForm
