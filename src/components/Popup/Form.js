import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import s from './index.css'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    helperText={touched && error}
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <TextField
    select
    label={label}
    helperText={touched && error}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...input}
    {...custom}
  />
)

class Form extends Component {
  render() {
    const { handleClosePopup, handleSubmit, pristine, submitting } = this.props
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <section>
            <Field
              name="name"
              component={renderTextField}
              label="Name"
              className={s.input}
            />
          </section>
          <section>
            <Field
              name="address"
              component={renderTextField}
              label="Address"
              className={s.input}
            />
          </section>

          <section>
            <Field
              name="cardType"
              component={renderSelectField}
              label="Payment Method"
              className={s.input}
            >
              <MenuItem selected value="Credit Card">
                Credit Card
              </MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Balance">Balance</MenuItem>
            </Field>
          </section>
          <section className={s.btnsContainer}>
            <Button
              onClick={handleClosePopup}
              color="secondary"
              className={s.btn}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={pristine || submitting}
              className={s.btn}
            >
              Save
            </Button>
          </section>
        </form>
      </Fragment>
    )
  }
}

const validate = (values) => {
  const errors = {}
  const requiredFields = ['name', 'address']

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Field is required'
    }
  })

  return errors
}

Form.propTypes = {
  handleClosePopup: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'formPopup',
  validate
})(Form)
