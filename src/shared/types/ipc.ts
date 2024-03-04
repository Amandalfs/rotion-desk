export interface Document {
  id: string
  title: string
  content?: string
}

export interface DocumentRecent extends Document {
  open_at: Date
}

export interface StateAppLast {
  type: string
  id?: string
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

export interface FetchStateAppLastResponse {
  data: StateAppLast
}
