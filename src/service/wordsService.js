import { API } from "../shared/api";

export const getWord = (word) => {
  return API.get(`/word?word=${word}`);
};
