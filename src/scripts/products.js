import { createElement, formatPrice, resolveImage } from './utils.js';

const createCard = (item, onSelect) => {
  const { name, description, price, image } = item;

  const li = document.createElement('li');
  const article = createElement('article', 'catalog-item');

  article.tabIndex = 0;
  article.setAttribute('role', 'button');
  article.setAttribute('aria-haspopup', 'dialog');

  article.addEventListener('click', onSelect);
  article.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  });

  const imgWrapper = createElement('div', 'catalog-item__img-wrapper');
  const img = createElement('img', 'catalog-item__img');

  img.src = resolveImage(image);
  img.alt = name;
  img.loading = 'lazy';
  img.decoding = 'async';
  imgWrapper.append(img);

  const content = createElement('div', 'catalog-item__content');
  content.append(
    createElement(
      'h2',
      'heading-reset catalog-item__title h3 color-primary',
      name,
    ),
    createElement(
      'p',
      'heading-reset catalog-item__description text-medium color-primary',
      description,
    ),
    createElement(
      'div',
      'catalog-item__price h3 color-primary',
      formatPrice(price),
    ),
  );

  article.append(imgWrapper, content);
  li.append(article);

  return li;
};

const createList = (group, isActive, onSelect) => {
  const ul = createElement('ul', 'list-reset catalog-list');
  ul.dataset.tabId = group.category;

  if (isActive) {
    ul.classList.add('catalog-list--active', 'catalog-list--visible');
  }

  ul.append(
    ...group.items.map((item) =>
      createCard(item, () => onSelect?.(item, group)),
    ),
  );
  return ul;
};

export const renderCatalog = (
  container,
  data,
  { activeCategory = data[0]?.category, onSelect } = {},
) => {
  if (!container) return;

  const fragment = document.createDocumentFragment();
  data.forEach((group) => {
    fragment.append(
      createList(group, group.category === activeCategory, onSelect),
    );
  });

  container.replaceChildren(fragment);
};
