// ===== SLIDESHOW =====
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
let current = 0;
let timer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

const dotEls = document.querySelectorAll('.dot');

function goTo(index) {
  slides[current].classList.remove('active');
  dotEls[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  dotEls[current].classList.add('active');
  resetTimer();
}

function next() {
  goTo((current + 1) % slides.length);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, 5500);
}

timer = setInterval(next, 5500);

// ===== SIGN-UP FORM =====
const form = document.getElementById('signupForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type="email"]').value.trim();
  if (!email) return;
  note.style.color = '#d4b896';
  note.textContent = '\u2713 You\'re on the list. We\'ll be in touch.';
  form.querySelector('input').value = '';
});

// ===== SCROLL FADE-IN for About Section =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.about-inner > *').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
  observer.observe(el);
});
