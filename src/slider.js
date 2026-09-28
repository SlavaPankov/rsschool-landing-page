const initSlider = (slider) => {
  const track = slider.querySelector('.slider__track');
  const slides = [...track.querySelectorAll('.slider__slide')];
  const prevBtn = slider.querySelector('.slider__arrow--prev');
  const nextBtn = slider.querySelector('.slider__arrow--next');

  const dotsRoot = slider.nextElementSibling?.classList.contains('slider__dots')
    ? slider.nextElementSibling
    : null;
  const dots = dotsRoot ? [...dotsRoot.querySelectorAll('.slider__dot')] : [];

  if (slides.length === 0) {
    return;
  }

  let current = Math.max(
    0,
    slides.findIndex((s) => s.classList.contains('is-active')),
  );

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;

    track.style.setProperty('--current', current);

    slides.forEach((slide, i) => {
      const isActive = i === current;

      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  let startX = null;
  track.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
  });
  track.addEventListener('pointerup', (e) => {
    if (startX === null) {
      return;
    }

    const diff = e.clientX - startX;

    if (Math.abs(diff) > 50) {
      goTo(diff < 0 ? current + 1 : current - 1);
    }

    startX = null;
  });
  track.addEventListener('pointercancel', () => {
    startX = null;
  });

  goTo(current);
};

document.querySelectorAll('.slider').forEach(initSlider);
