const { API_HOST } = process.env

function get<T extends Response>(url: string, query?: object): Promise<T> {
  let link = `${API_HOST}${url}`
  if (query) {
    const queryString = buildQuery(query)
    link += `?${queryString}`
  }
  return fetch(link) as Promise<T>
}

function post<T extends Response>(
  url: string,
  body: object,
  query?: object
): Promise<T> {
  let link = `${API_HOST}${url}`
  if (query) {
    const queryString = buildQuery(query)
    link += `?${queryString}`
  }
  return fetch(link, { method: 'POST', body: JSON.stringify(body) }) as Promise<
    T
  >
}

function buildQuery(obj: object) {
  return Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&')
}

export default {
  get,
  post
}
