export interface ParamsWithId {
  params: Promise<{
    id: string
  }>
}

export interface ParamsWithQuery {
  searchParams: Promise<{
    page?: number
    search?: string
  }>
}

export type QueryParams = {
  search?: string
  page?: number
  limit?: number
}

export type ActionResultState = {
  message?: string
  error?: string
}
export interface SelectOption {
  label: string
  value: string
}
