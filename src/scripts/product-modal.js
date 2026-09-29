import { createElement, formatPrice, resolveImage } from './utils.js';

const MODAL_TEMPLATE = `
  <div class="product-modal__inner">
    <div class="product-modal__img-wrapper">
      <img class="product-modal__img" src="" alt="">
    </div>

    <div class="product-modal__content">
      <div class="product-modal__info">
        <h3 id="product-modal-title" class="heading-reset h3 color-primary product-modal__title"></h3>
        <p class="heading-reset text-medium color-primary product-modal__description"></p>
      </div>

      <fieldset class="product-modal__group">
        <legend class="product-modal__legend text-medium color-primary">Size</legend>
        <div class="product-modal__options" data-options="sizes"></div>
      </fieldset>

      <fieldset class="product-modal__group">
        <legend class="product-modal__legend text-medium color-primary">Additives</legend>
        <div class="product-modal__options" data-options="additives"></div>
      </fieldset>

      <div class="product-modal__total h3 color-primary">
        <span>Total:</span>
        <output class="product-modal__price" aria-live="polite"></output>
      </div>

      <p class="heading-reset product-modal__note color-primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor"/>
          <path d="M8 7.5V11M8 5.25V5" stroke="currentColor" stroke-linecap="round"/>
        </svg>
        <span>The total price depends on the selected size and additives. After adding the item, you can review it in My order.</span>
      </p>

      <button class="button-reset product-modal__close button-secondary" type="button">Close</button>
    </div>
  </div>
`;

let modal = null;
let ui = null;
let state = null;

const createOption = ({ type, name, value, badge, label, checked = false }) => {
  const option = createElement('label', 'product-option tab-item');

  const input = createElement('input', 'product-option__input visually-hidden');
  input.type = type;
  input.name = name;
  input.value = value;
  input.checked = checked;

  option.append(
    input,
    createElement('span', 'product-option__badge tab-item__icon', badge),
    createElement('span', 'product-option__label', label),
  );

  return option;
};

const getTotal = () => {
  if (!state) {
    return 0;
  }

  const { item, sizes, additives } = state;

  const sizeKey = ui.sizes.querySelector('input:checked')?.value;
  const sizePrice = sizes.find((size) => size.key === sizeKey)?.price ?? 0;

  const additivesPrice = [
    ...ui.additives.querySelectorAll('input:checked'),
  ].reduce(
    (sum, input) => sum + (additives[Number(input.value)]?.price ?? 0),
    0,
  );

  return item.price + sizePrice + additivesPrice;
};

const updateTotal = () => {
  ui.price.textContent = formatPrice(getTotal());
};

const createModal = () => {
  const dialog = createElement('dialog', 'product-modal');
  dialog.setAttribute('aria-labelledby', 'product-modal-title');
  dialog.innerHTML = MODAL_TEMPLATE;

  ui = {
    img: dialog.querySelector('.product-modal__img'),
    title: dialog.querySelector('.product-modal__title'),
    description: dialog.querySelector('.product-modal__description'),
    sizes: dialog.querySelector('[data-options="sizes"]'),
    additives: dialog.querySelector('[data-options="additives"]'),
    price: dialog.querySelector('.product-modal__price'),
    close: dialog.querySelector('.product-modal__close'),
  };

  dialog.addEventListener('change', updateTotal);
  ui.close.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    state = null;
  });

  document.body.append(dialog);
  return dialog;
};

export const openProductModal = (item, group) => {
  modal ??= createModal();

  state = {
    item,
    sizes: group.sizes ?? [],
    additives: group.additives ?? [],
  };

  ui.img.src = resolveImage(item.image);
  ui.img.alt = item.name;
  ui.title.textContent = item.name;
  ui.description.textContent = item.description;

  ui.sizes.replaceChildren(
    ...state.sizes.map((size, index) =>
      createOption({
        type: 'radio',
        name: 'size',
        value: size.key,
        badge: size.key.toUpperCase(),
        label: size.label,
        checked: index === 0,
      }),
    ),
  );

  ui.additives.replaceChildren(
    ...state.additives.map((additive, index) =>
      createOption({
        type: 'checkbox',
        name: 'additive',
        value: String(index),
        badge: String(index + 1),
        label: additive.name,
      }),
    ),
  );

  updateTotal();
  modal.showModal();
};
