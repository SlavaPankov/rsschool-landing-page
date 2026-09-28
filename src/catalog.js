const tabsList = document.querySelector('.tabs-list');
const tabs = [...tabsList.querySelectorAll('.tab-item')];
const catalogs = document.querySelectorAll('.catalog-list');

const showCatalog = (catalog) => {
  catalog.classList.add('catalog-list--active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      catalog.classList.add('catalog-list--visible');
    });
  });
};

const hideCatalog = (catalog) => {
  if (!catalog.classList.contains('catalog-list--visible')) {
    return;
  }

  catalog.classList.remove('catalog-list--visible');

  const handleTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') {
      return;
    }

    catalog.classList.remove('catalog-list--active');
    catalog.removeEventListener('transitionend', handleTransitionEnd);
  };

  catalog.addEventListener('transitionend', handleTransitionEnd);
};

const activateTab = (tab) => {
  tabs.forEach((item) => item.classList.remove('tab-item--active'));
  tab.classList.add('tab-item--active');

  const target = tab.dataset.tab;
  const targetCatalog = document.querySelector(`[data-tab-id="${target}"]`);

  catalogs.forEach((panel) => {
    if (panel !== targetCatalog) hideCatalog(panel);
  });

  showCatalog(targetCatalog);
};

tabsList.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab-item');
  if (tab) activateTab(tab);
});
