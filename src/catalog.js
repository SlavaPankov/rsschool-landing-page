import { renderCatalog } from './scripts/products.js';
import { tabsInit } from './scripts/tabs.js';
import { initMoreButton } from './scripts/more-button.js';

const initCatalog = async () => {
  const container = document.querySelector('.catalog-stack');

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}products.json`);

    if (!response.ok)
      throw new Error(`Failed to load menu: ${response.status}`);

    renderCatalog(container, await response.json());
    tabsInit();
  } catch (error) {
    console.error(error);
    container.textContent = 'Failed to load the menu. Please try again later.';
  }
};

await initCatalog();
initMoreButton();
