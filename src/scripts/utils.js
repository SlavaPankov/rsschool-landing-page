export const formatPrice = (price) => `$${price.toFixed(2)}`;

export const createElement = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (text !== undefined) {
    el.textContent = text;
  }
  return el;
};

const imageUrls = import.meta.glob('/src/assets/{coffee,tea,dessert}-*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const resolveImage = (path) => {
  const url = imageUrls[path];
  if (!url) console.warn(`Catalog image not found: ${path}`);
  return url ?? '';
};
