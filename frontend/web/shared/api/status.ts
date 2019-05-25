import api, { BasicResponse } from './index';

export type Status = {
  [n: string]: string;
};

export const statusMap = {};

export async function getStatus() {
  return await api.post('/search/status', {});
}
