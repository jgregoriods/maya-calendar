import { elements } from './base.js';

export const getInput = () => {
  if (elements.constant.value) return parseInt(elements.constant.value);
  else return 0;
}