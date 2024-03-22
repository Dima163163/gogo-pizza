import {hideLoader, showLoader} from './loader.js';

export const getData = async (url) => {
  showLoader();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch pizza products');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching pizza products: ${error}`);
    return [];
  } finally {
    hideLoader();
  }
};
