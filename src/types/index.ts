export interface ParamsWithId {
  params: Promise<{
    id: string
  }>
}

export type ActionResultState = {
  message?: string
  error?: string
}
