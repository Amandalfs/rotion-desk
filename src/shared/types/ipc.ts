export interface Document {
  id: string
  title: string
  content?: string
}

/*
 * Request
 */

export interface FetchSaveDocumentRequest extends Document {}

export interface FetchDocumentRequest {
  id: string
}

export interface FetchDeleteDocumentRequest {
  id: string
}

/*
 * Response
 */

export interface FetchAllDocumentsResponse {
  data: Document[]
}

export interface FetchDocumentResponse {
  data: Document
}
export interface FetchCreateDocumentResponse {
  data: Document
}
