import * as qs from 'qs'

export const setQuery = (id, text) => {
    const query = {}
    if(id) query.categoryId = String(id)
    if (text) query.q = String(text)
    return qs.stringify(query)
}

export const getQuery = (params) => {
    const parsed = qs.parse(params.toString())
    return parsed
}
