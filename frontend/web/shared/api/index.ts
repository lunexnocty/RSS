const API_HOST = 'http://132.232.149.150:3389/api'
console.log(API_HOST)
async function get<T>(url: string, query?: object): Promise<T> {
  let link = buildLink(url, query)
  const res = await fetch(link, { mode: 'cors' })
  return (await res.json()) as Promise<T>
}

async function post<T>(url: string, body: object, query?: object): Promise<T> {
  let link = buildLink(url, query)
  const res = await fetch(link, {
    method: 'POST',
    body: JSON.stringify(body),
    mode: 'cors'
  })

  return (await res.json()) as Promise<T>
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
