const { API_HOST } = process.env

async function get<T extends Response>(
  url: string,
  query?: object
): Promise<T> {
  let link = buildLink(url, query)
  return fetch(link) as Promise<T>
}

async function post<T extends Response>(
  url: string,
  body: object,
  query?: object
): Promise<T> {
  let link = buildLink(url, query)
  return fetch(link, { method: 'POST', body: JSON.stringify(body) }) as Promise<
    T
  >
}

function buildLink(url: string, query?: object): string {
  let link = `${API_HOST}${url}`
  if (query) {
    const queryString = buildQuery(query)
    link += `?${queryString}`
  }
  return link
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
