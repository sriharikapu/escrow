import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import Web3 from 'web3'
import Textarea from 'react-textarea-autosize'

import { ReactComponent as Plus } from '../../assets/plus-purple.svg'
import Button from '../button'
import templates from '../../constants/templates'

import './new-arbitrable-tx.css'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ccc',
    color: state.isSelected ? '#fff' : '#4a4a4a',
    background: state.isSelected ? '#4d00b4' : state.isFocused ? '#f5f5f5' : null
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  }
}

const NewArbitrableTx = ({ formArbitrabletx, balance }) => (
  <div className='NewArbitrableTx'>
    <h1 className='NewArbitrableTx-h1'><Plus style={{width: '20px', height: '35px', position: 'relative', top: '11px', paddingRight: '8px'}} />New Transaction</h1>
    <Formik
      initialValues={{
        title: '',
        description: '', 
        file: '',
        sender: '',
        amount: ''
      }}
      validate = {values => {
        {/* TODO use Yup */}
        let errors = {}
        if (values.title.length > 55)
          errors.title = 'Number of characters for the title allowed is exceeded. The maximum is 55 characters.'
        if (!values.sender)
          errors.sender = 'Sender Address Required'
        if (!Web3.utils.isAddress(values.sender))
          errors.sender = 'Valid Address Required'
        if (!values.amount)
          errors.amount = 'Amount Required'
        if (values.amount <= 0)
          errors.amount = 'Amount must be positive.'
        if (isNaN(values.amount))
          errors.amount = 'Number Required'
        if (values.amount > balance.data)
          errors.amount = 'Amount must equal of lower than your ETH balance.'
        if (values.description.length > 1000000)
          errors.description = 'The maximum numbers of the characters for the description is 1,000,000 characters.'
        if (values.file.size > 5000000)
          errors.file = 'The maximum size of the file is 5Mo.'

        return errors
      }}
      onSubmit={arbitrabletx => formArbitrabletx(arbitrabletx)}
    >
      {({ errors, setFieldValue, touched, isSubmitting, values, handleChange }) => (
        <Form className='FormNewArbitrableTx'>
          <label htmlFor='title' className='FormNewArbitrableTx-label FormNewArbitrableTx-label-title'>Title</label>
          <Field name='title' className='FormNewArbitrableTx-input FormNewArbitrableTx-input-title' placeholder='Title' />
          <ErrorMessage name='title' component='div' className='FormNewArbitrableTx-error FormNewArbitrableTx-error-title' />
          <div className='FormNewArbitrableTx-help FormNewArbitrableTx-help-title'>Eg. Marketing Services Agreement with John</div>
          <label htmlFor='sender' className='FormNewArbitrableTx-label FormNewArbitrableTx-label-sender'>Sender</label>
          <Field name='sender' className='FormNewArbitrableTx-input FormNewArbitrableTx-input-sender' placeholder='Sender Address' />
          <ErrorMessage name='sender' component='div' className='FormNewArbitrableTx-error FormNewArbitrableTx-error-sender' />
          <div className='FormNewArbitrableTx-help FormNewArbitrableTx-help-sender'>
            Enter the ETH address of the counterparty to this agreement.
          </div>
          <label htmlFor='amount' className='FormNewArbitrableTx-label FormNewArbitrableTx-label-amount'>Amount (ETH)</label>
          <Field name='amount' className='FormNewArbitrableTx-input FormNewArbitrableTx-input-amount' placeholder='Amount' />
          <ErrorMessage name='amount' component='div' className='FormNewArbitrableTx-error FormNewArbitrableTx-error-amount' />
          <div className='FormNewArbitrableTx-help FormNewArbitrableTx-help-amount'>
            Enter the amount of money that will be sent to the escrow as payment 
            for the receiver. 
            <br />Funds will stay in the escrow until the transaction 
            is completed.
          </div>
          {/* hack Formik for file type */}
          {/* and store only the path on the file in the redux state */}
          <label htmlFor='file' className='file' className='FormNewArbitrableTx-label FormNewArbitrableTx-label-file'>Primary document</label>
          <input className='FormNewArbitrableTx-label FormNewArbitrableTx-input-file' id='file' style={{border: '#009AFF', padding: '0.6em 0', fontSize: '1em'}} name='file' type='file' onChange={e => {
              const file = e.currentTarget.files[0]
              return setFieldValue('file', {
                dataURL: (window.URL || window.webkitURL).createObjectURL(file),
                name: file.name,
                size: file.size
              })
            }
          } />
          {errors.file && <div className='FormNewArbitrableTx-error FormNewArbitrableTx-error-file'>{errors.file}</div>}
          <div className='FormNewArbitrableTx-help FormNewArbitrableTx-help-file'>
            Upload the files that will be used as evidence in case there is a dispute. 
            <br />If you need to add more than one file, zip them.
          </div>
          <label htmlFor='description' className='FormNewArbitrableTx-label FormNewArbitrableTx-label-description'>Description</label>
          <div className='FormNewArbitrableTx-template-description-wrapper'>
            <Field
              render={({ form }) => (
                <Select
                  className='FormNewArbitrableTx-template-description-wrapper-content'
                  classNamePrefix='select'
                  isClearable={false}
                  isSearchable={true}
                  name='templates'
                  options={templates}
                  styles={customStyles}
                  onChange={e => form.setFieldValue('description', e.content)}
                />
              )}
            />
          </div>
          <Field
            name='description'
            value={values.description}
            render={({ field, form }) => (
              <Textarea
                {...field}
                className='FormNewArbitrableTx-textarea FormNewArbitrableTx-input-description'
                minRows={10}
                onChange={e => {
                  handleChange(e)
                  form.setFieldValue('description', e.target.value)
                }}
              />
            )}
          />
          <ErrorMessage name='description' component='div' className='FormNewArbitrableTx-error FormNewArbitrableTx-error-description' />
          <div className='FormNewArbitrableTx-submit'>
            {touched.description = true}
            <Button type='submit' disabled={touched.sender === undefined || touched.amount === undefined || Object.entries(errors).length > 0 || isSubmitting}>Save Transaction</Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
)

NewArbitrableTx.propTypes = {
  // State
  formArbitrabletx: PropTypes.func
}

NewArbitrableTx.defaultProps = {
  // State
  formArbitrabletx: v => v
}

export default NewArbitrableTx
