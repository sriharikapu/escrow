import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'

import * as arbitrabletxActions from '../../../actions/arbitrable-transaction'
import * as arbitrabletxSelectors from '../../../reducers/arbitrable-transaction'
import ResumeArbitrableTx from '../../../components/resume-arbitrable-tx'
import Button from '../../../components/button'

import './resume.css'

class Resume extends PureComponent {
  static propTypes = {
    arbitrabletxForm: arbitrabletxSelectors.arbitrabletxFormShape.isRequired,

    createArbitrabletx: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchMetaEvidenceArbitrabletx, metaEvidenceIPFSHash } = this.props
    fetchMetaEvidenceArbitrabletx(metaEvidenceIPFSHash)
  }

  render() {
    const { createArbitrabletx, arbitrabletxForm, metaEvidenceIPFSHash } = this.props

    return (
      <div>
        {
          arbitrabletxForm.amount !== undefined && (
            <ResumeArbitrableTx 
              arbitrabletx={arbitrabletxForm}
              title={<React.Fragment>Summary</React.Fragment>}
            >
              <Formik onSubmit={() => createArbitrabletx(arbitrabletxForm, metaEvidenceIPFSHash)}>
                {({isSubmitting}) => (
                  <Form className={'PayOrReimburseArbitrableTx'}>
                    <Button type='submit' disabled={isSubmitting}>
                      Submit Transaction
                    </Button>
                  </Form>
                )}
              </Formik>
            </ResumeArbitrableTx>
          )
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    arbitrabletxForm: state.arbitrabletx.arbitrabletxResumeForm
  }),
  {
    createArbitrabletx: arbitrabletxActions.createArbitrabletx,
    fetchMetaEvidenceArbitrabletx: arbitrabletxActions.fetchMetaEvidence
  }
)(Resume)