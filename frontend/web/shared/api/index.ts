const API_HOST = "http://132.232.149.150:3389/api";

export type BasicResponse = {
  info: string;
  status: string;
};

async function get<R extends BasicResponse>(
  url: string,
  query?: object
): Promise<R | BasicResponse> {
  let link = buildLink(url, query);

  try {
    const res = await fetch(link, { mode: "cors" });
    return (await res.json()) as Promise<R>;
  } catch {
    return {
      info: "Network Error",
      status: "failed"
    };
  }
}

async function post<R extends BasicResponse>(
  url: string,
  body: object,
  query?: object
): Promise<R | BasicResponse> {
  let link = buildLink(url, query);

  try {
    const res = await fetch(link, {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors"
    });

    return (await res.json()) as Promise<R>;
  } catch {
    return {
      info: "Network Error",
      status: "failed"
    };
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
    .map(pair => pair.map(encodeURIComponent).join("="))
    .join("&");
}

export default {
  get,
  post
};
