const INITIAL_COUNT = 4;
const STEP = 2;

const getActiveList = () => document.querySelector('.catalog-list--active');

const getHiddenItems = (list) =>
  [...list.children]
    .slice(INITIAL_COUNT)
    .filter((li) => !li.classList.contains('is-revealed'));

export const updateMoreButton = () => {
  const button = document.querySelector('.more-button');
  if (!button) {
    return;
  }

  const list = getActiveList();
  button.hidden = !list || getHiddenItems(list).length === 0;
};

export const resetMoreButton = () => {
  document
    .querySelectorAll('.catalog-list .is-revealed')
    .forEach((li) => li.classList.remove('is-revealed'));

  updateMoreButton();
};

export const initMoreButton = () => {
  const button = document.querySelector('.more-button');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const list = getActiveList();

    if (!list) {
      return;
    }

    getHiddenItems(list)
      .slice(0, STEP)
      .forEach((li) => li.classList.add('is-revealed'));

    updateMoreButton();
  });

  updateMoreButton();
};
