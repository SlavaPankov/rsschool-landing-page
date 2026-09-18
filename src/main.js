const STORAGE_KEY = 'theme';
const inputs = document.querySelectorAll('.theme-switch__input');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    delete document.documentElement.dataset.theme;
  }
}

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
