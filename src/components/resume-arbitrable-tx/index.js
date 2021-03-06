import React, { useState } from 'react'

import * as arbitrabletxSelectors from '../../reducers/arbitrable-transaction'
import { ReactComponent as PrimaryDocument } from '../../assets/primary-document.svg'
import Attachment from '../../components/attachment'
import Button from '../../components/button'
import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import { shortUrl } from '../../utils/short-url'

import './resume-arbitrable-tx.css'

const ResumeArbitrableTx = ({ arbitrabletx, title, children, footer }) => {
  const [copied, setCopied] = useState(false)
  const [showAllDescription, setShowAllDescription] = useState(true)
  return (
    <>
      <div className='ResumeArbitrableTx'>
        <h1 className='ResumeArbitrableTx-h1'>{title}</h1>
        <div className='ResumeArbitrableTx-ContentNewArbitrableTx'>
          <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-title'>Title</div>
          <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-title'>{arbitrabletx.title}</div>
          <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-sender'>{arbitrabletx.otherParty}</div>
          <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-sender'>{arbitrabletx.otherPartyAddress}</div>

          {arbitrabletx.amount > 0 && (
            <>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-amount'>Amount</div>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content  ResumeArbitrableTx-ContentNewArbitrableTx-content-amount'>{arbitrabletx.amount} ETH</div>
            </>
          )}


          {arbitrabletx.file && (
            <>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-file'>Primary Document</div>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-file' style={{border: '0'}}>
                <a href={arbitrabletx.file} alt='Primary Document' target='_blank' rel='noopener noreferrer'>
                  <PrimaryDocument />
                </a>
              </div>
            </>
          )}

          {arbitrabletx.description && (
            <>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name-description'>Description</div>
              <div className={`ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description`} onClick={() => setShowAllDescription(!showAllDescription)}><Arrow className={`${showAllDescription ? 'ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description-show-all' : 'ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description-not-show-all'}`} onClick={() => setShowAllDescription(!showAllDescription)} /></div>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-description'><p className={`${showAllDescription && 'ResumeArbitrableTx-ContentNewArbitrableTx-content-description-p-short'}`}>{arbitrabletx.description}</p></div>
            </>
          )}


          {arbitrabletx.shareLink && (
            <>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-share'>Share Transaction</div>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-link-share'>
                <div className='ResumeArbitrableTx-ContentNewArbitrableTx-link-share-url'>
                  {shortUrl(arbitrabletx.shareLink)}
                </div>
                {
                  /*
                    Logical shortcut for only displaying the
                    button if the copy command exists
                  */
                  document.queryCommandSupported('copy') && (
                    !copied ? (
                      <Button
                        style={{marginLeft: '-3px', paddingTop: '12px', boxSizing: 'border-box', width: '130px'}}
                        onClick={() => {navigator.clipboard.writeText(arbitrabletx.shareLink) && setCopied(true)}}
                      >
                        Copy
                      </Button>
                    ) : (
                      <Button
                        disabled={true}
                        style={{marginLeft: '-3px', paddingTop: '12px', boxSizing: 'border-box', width: '130px'}}
                      >
                        Copied
                      </Button>
                    )
                  )	
                }
                <a
                  href=
                    {`
                      mailto:alice%40example.com
                      ?subject=Invoice ${encodeURIComponent(arbitrabletx.title)}
                      &body=Hi%2C%0A%0AHere%20is%20the%20link%20to%20the%20${encodeURIComponent(arbitrabletx.title)}%20invoice: ${arbitrabletx.shareLink}.%0A%0ABest%2C%0A
                    `}
                >
                  <Button
                    style={{paddingTop: '12px', marginLeft: '1em', boxSizing: 'border-box'}}
                  >
                    Send by Email
                  </Button>
                </a>
              </div>
            </>
          )}

          {arbitrabletx.evidences && (
            <>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-name'>Evidences</div>
              <div className='ResumeArbitrableTx-ContentNewArbitrableTx-content' style={{border: '0'}}>
                {
                  arbitrabletx.evidences.map((evidence, index) => (
                    <Attachment
                      URI={evidence.evidenceJSON.fileURI}
                      title={evidence.evidenceJSON.name}
                      description={evidence.evidenceJSON.description}
                      key={index}
                    />
                  ))
                }
              </div>
            </>
          )}

          <div className= 'ResumeArbitrableTx-ContentNewArbitrableTx-submit'>
            {children}
          </div>
        </div>

      </div>
      {footer}
    </>
  )
}

ResumeArbitrableTx.propTypes = {
  // State
  arbitrabletx: arbitrabletxSelectors.arbitrabletxFormShape.isRequired
}

ResumeArbitrableTx.defaultProps = {
  // State
  arbitrableTx: {}
}

export default ResumeArbitrableTx