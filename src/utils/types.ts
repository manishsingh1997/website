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
    identifier: string,
    'non_field_errors': string[]
  }
}

export type getFencequotingURLProps = {
  schemaCode: string,
  zipCode: string,
  fenceSideLength: number,
  fenceSideSlopePercent: number,
  options?: boolean,
}
