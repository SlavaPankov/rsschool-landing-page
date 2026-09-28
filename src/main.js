const STORAGE_KEY = 'theme';
const inputs = document.querySelectorAll('.theme-switch__input');

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    delete document.documentElement.dataset.theme;
  }
};

const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
applyTheme(savedTheme);

const savedInput = document.querySelector(
  `.theme-switch__input[value="${savedTheme}"]`,
);
if (savedInput) savedInput.checked = true;

inputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (!input.checked) return;
    applyTheme(input.value);
    localStorage.setItem(STORAGE_KEY, input.value);
  });
});

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const mobileQuery = window.matchMedia('(max-width: 768px)');

const isMenuOpen = () => nav.classList.contains('nav--open');

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    burger.focus();
  }
};

const setMenuOpen = (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen);
  nav.classList.toggle('nav--open', isOpen);
  burger.classList.toggle('burger--active', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    document.removeEventListener('keydown', handleKeydown);
  }
};

if (burger && nav) {
  burger.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') && isMenuOpen()) {
      setMenuOpen(false);
    }
  });
  mobileQuery.addEventListener('change', (event) => {
    if (!event.matches && isMenuOpen()) {
      setMenuOpen(false);
    }
  });
}
