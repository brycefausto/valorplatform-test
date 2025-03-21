import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams } from "next/navigation"

const changePage = (newPage: number, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance, pathname: string) => {
  const params = new URLSearchParams(searchParams)

  if (newPage > 1) {
    params.set("page", newPage.toString())
  } else {
    params.delete("page")
  }

  router.replace(`${pathname}?${params.toString()}`)
}

const changeSearch = (newSearch: string, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance, pathname: string) => {
  const params = new URLSearchParams(searchParams)

  if (newSearch) {
    params.set("search", newSearch)
  } else {
    params.delete("search")
  }

  router.replace(`${pathname}?${params.toString()}`)
}

export const pageUtils = {
  changePage,
  changeSearch
}