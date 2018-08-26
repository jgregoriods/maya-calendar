import { elements } from './base';

export const getInput = () => {
  if (elements.constant.value) return parseInt(elements.constant.value);
  else return 0;
}