export type ParsedAPIErrorType = {
  response?: ErrorResponse,
  statusCode?: string,
  statusText?: string,
  data?: object,
  nonFieldErrors: string[],
}

export type ErrorResponse = {
  status: string,
  statusText: string,
  data?: {
    'non_field_errors': string[]
  }
}
