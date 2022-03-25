import React, { useRef, useState } from 'react'
import { DocumentState } from './document'
import get from 'lodash/get'
import { config } from '../config'

const _ = {
  get
}

const downloadDocumentEndpoint = config['endpoints']['downloadDocument']
const uploadDocumentEndpoint = config['endpoints']['uploadDocument']

export const Document = (props: any) => {
  const fileInput = useRef(null)
  const steps = {
    NOT_STARTED: 0,
    DOWNLOAD_DOCUMENT: 1,
    UPLOAD_DOCUMENT: 2
  }
  const [state, setState] = useState<DocumentState>({
    fileInfo: [],
    step: 0
  })

  const downloadDocument = () => {
    //Downloading from public locally
    //TODO: Implement api service that handles document download/upload
    const fileUrl = '/documents/sign_document.docx'
    const fileName = 'sign_document.docx'

    let a = document.createElement('a')
    a.href = fileUrl
    a.target = '_blank'
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.parentNode.removeChild(a)

    setState(state => ({
      ...state,
      step: 1
    }))
  }

  const uploadDocument = (event: any) => {
    const files = _.get(event, 'target.files')
    const document = _.get(files, [0])
    const fileInfo = [...files].map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }))
    let formData = new FormData()
    formData.append('document', document)

    //TODO: Verify document was e-signed through DocuSign eSignature api

    const { step } = state

    if (step === steps.DOWNLOAD_DOCUMENT) {
      setState(state => ({
        ...state,
        step: 2,
        fileInfo
      }))
    }

    //For saving the document to the backend
    /*fetch(uploadDocumentEndpoint, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        setState(state => ({
          ...state,
          uploaded: true,
          fileInfo
        }))
      })
      .catch(error => console.error('Unable to upload your document: ', error))*/
  }

  const { step } = state

  const complete = step === steps.UPLOAD_DOCUMENT

  return (
    <div className='row'>
      <div className='col-12'>
        <h1>Sign Document</h1>
        <p>
          Please download and sign the Word document. Then upload the signed
          document.
        </p>
        <p>
          Status: <span>{complete ? 'Complete' : 'Uncomplete'}</span>
        </p>
        <label>Download Document</label>
        <div>
          <button
            id='download_documentBtn'
            className='btn btn-primary mb-2'
            onClick={downloadDocument}>
            {' '}
            Download
          </button>
        </div>
        <div>
          <label>Upload Document</label>
          <div>
            <form>
              <input
                ref={fileInput}
                id='upload_fileInput'
                className='d-none'
                type='file'
                accept='.docx'
                onChange={uploadDocument}
              />
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => fileInput.current.click()}>
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
