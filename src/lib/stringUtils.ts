import _ from "lodash"

export const capitalizeWords = (text: string, separator = ' ') => {
  return text.split(separator).reduce((prev, current, index) => prev += (index == 0 ? '' : ' ') + _.capitalize(current), '')
}

export const convertToUrlParams = (queryParams: { [key: string]: string | number }) => {
  const urlParams = new URLSearchParams()

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(value => urlParams.append(key, value.toString()))
      } else {
        urlParams.append(key, value.toString())
      }
    }
  })

  return urlParams;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'PHP',
  }).format(price);
}