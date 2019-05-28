import api, { BasicResponse } from './index';

export type RSTResponse = {
  baseActivity: string;
  enable: boolean;
  extra: string;
  id: number;
  maxActivity: string;
  minActivity: string;
  name: string;
  update_time: string;
};

export type SourceResponse = {
  activity: number;
  enable: true;
  extra: string;
  governor: number;
  id: number;
  level: number;
  name: string;
  terminal: number;
  update_time: string;
};

export type StateResponse = {
  activity: number;
  battery: number;
  coordinate: [number, number];
  extra: string;
  id: number;
  locked: true;
  radiation_status: string;
  terminal: number;
  terminal_status: string;
  time: string;
  update_time: string;
};

export interface SearchResponse extends BasicResponse {
  rst?: RSTResponse;
  source?: SourceResponse;
  state?: StateResponse;
}

export async function search(id: number) {
  return await api.get<SearchResponse>('/search', { id });
}

export default {
  search
};
