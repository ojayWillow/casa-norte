// ===== SLIDESHOW =====
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const heroContent = document.querySelector('.hero-content');
const scrollHint = document.querySelector('.scroll-hint');
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

function toggleContent(index) {
  const isVideo = slides[index].classList.contains('slide-video');
  if (isVideo) {
    heroContent.style.opacity = '0';
    heroContent.style.pointerEvents = 'none';
    scrollHint.style.opacity = '0';
  } else {
    heroContent.style.opacity = '1';
    heroContent.style.pointerEvents = 'auto';
    scrollHint.style.opacity = '1';
  }
}

function goTo(index) {
  // Pause video in current slide if it has one
  const currentVideo = slides[current].querySelector('video');
  if (currentVideo) currentVideo.pause();

  slides[current].classList.remove('active');
  dotEls[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  dotEls[current].classList.add('active');

  // Play video in new slide if it has one
  const newVideo = slides[current].querySelector('video');
  if (newVideo) {
    newVideo.currentTime = 0;
    newVideo.play();
  }

  toggleContent(current);
  resetTimer();
}

function next() {
  goTo((current + 1) % slides.length);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, 5500);
}

// Initial state
toggleContent(0);
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
