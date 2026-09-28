const formatPrice = (price) => `$${price.toFixed(2)}`;

const imageUrls = import.meta.glob('/src/assets/{coffee,tea,dessert}-*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const resolveImage = (path) => {
  const url = imageUrls[path];

  if (!url) {
    console.warn(`Catalog image not found: ${path}`);
  }

  return url ?? '';
};

const createElement = (tag, className, text) => {
  const el = document.createElement(tag);

  if (className) {
    el.className = className;
  }

  if (text !== undefined) {
    el.textContent = text;
  }

  return el;
};

const createCard = ({ name, description, price, image }) => {
  const li = document.createElement('li');
  const article = createElement('article', 'catalog-item');

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

const createList = ({ category, items }, isActive) => {
  const ul = createElement('ul', 'list-reset catalog-list');
  ul.dataset.tabId = category;

  if (isActive) {
    ul.classList.add('catalog-list--active', 'catalog-list--visible');
  }

  ul.append(...items.map(createCard));
  return ul;
};

export const renderCatalog = (
  container,
  data,
  activeCategory = data[0]?.category,
) => {
  if (!container) {
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach((group) => {
    fragment.append(createList(group, group.category === activeCategory));
  });

  container.replaceChildren(fragment);
};
