const STORAGE_KEY = 'theme';

const switcher = document.querySelector('.theme-switch');
const options = switcher.querySelectorAll('.theme-switch__option');

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    delete document.documentElement.dataset.theme;
  }

  options.forEach((opt) => {
    const isActive = opt.dataset.theme === theme;
    opt.classList.toggle('is-active', isActive);
    opt.setAttribute('aria-checked', String(isActive));
  });
};

const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
applyTheme(savedTheme);

switcher.addEventListener('click', (e) => {
  const btn = e.target.closest('.theme-switch__option');

  if (!btn || btn.classList.contains('is-active')) {
    return;
  }

  const theme = btn.dataset.theme;
  applyTheme(theme);
  localStorage.setItem(STORAGE_KEY, theme);
});
