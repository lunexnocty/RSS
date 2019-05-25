import api, { BasicResponse } from './index';

export type Source = {
  id: number;
  name: string;
  enable: boolean;
  source_id: number;
  update_time: string;
  [key: string | number]: any;
};

interface SearchResponse extends BasicResponse {
  rst: Source[];
}
type SearchProps = {
  page: number;
  enable: 1 | -1;
};
export async function search(props: SearchProps) {
  return await api.get<SearchResponse>('/sources', props);
}

export default {
  search
};
