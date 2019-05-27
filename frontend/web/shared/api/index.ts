const API_HOST = 'http://132.232.149.150:3389/api';

export type BasicResponse = {
  infomation?: string;
  error?: string;
  status: number;
};

export const NetWorkError: BasicResponse = {
  infomation: 'Network Error',
  status: -1
};

async function get<R extends BasicResponse>(
  url: string,
  query?: object
): Promise<R | BasicResponse> {
  try {
    let link = buildLink(url, query);
    const res = await fetch(link, { mode: 'cors', credentials: 'include' });
    if (!res.ok) {
      console.log('!ok');
      throw new Error(res.statusText);
    }
    return (await res.json()) as Promise<R>;
  } catch {
    return NetWorkError;
  }
}

async function post<R extends BasicResponse>(
  url: string,
  body: object,
  query?: object
): Promise<R | BasicResponse> {
  try {
    let link = buildLink(url, query);

    const res = await fetch(link, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      mode: 'cors'
    });
    if (!res.ok) {
      console.log('!ok');
      throw new Error(res.statusText);
    }
    return (await res.json()) as Promise<R>;
  } catch {
    return NetWorkError;
  }
}

function buildLink(url: string, query?: object): string {
  let link = `${API_HOST}${url}`;
  if (query) {
    const queryString = buildQuery(query);
    link += `?${queryString}`;
  }
  return link;
}

function buildQuery(obj: object) {
  return Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');
}

export default {
  get,
  post
};
