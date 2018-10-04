import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import { connect } from 'react-redux'
import { Title } from '../Typography'
import Form from './Form'
import { addAccountPerson } from '../../redux/actions/accountPerson'
import s from './index.css'

class Popup extends Component {
  handleSubmit = (person) => {
    this.props.addAccountPerson(person)
    this.props.handleClosePopup()
  }

  render() {
    const { isOpenPopup, handleClosePopup } = this.props

    return (
      <Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpenPopup}
          onClose={handleClosePopup}
        >
          <section className={s.popup}>
            <section className={s.popupWrap}>
              <Title>Add your account</Title>

              <Form
                onSubmit={this.handleSubmit}
                handleClosePopup={handleClosePopup}
              />
            </section>
          </section>
        </Modal>
      </Fragment>
    )
  }
}

Popup.propTypes = {
  isOpenPopup: PropTypes.bool.isRequired,
  handleClosePopup: PropTypes.func.isRequired
}

export default connect(
  null,
  { addAccountPerson }
)(Popup)
