const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('ko-finance-theme');

if (storedTheme === 'light') {
  document.body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem(
    'ko-finance-theme',
    document.body.classList.contains('light') ? 'light' : 'dark'
  );
});

document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const updateActiveNav = () => {
  const scrollY = window.scrollY + 140;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));