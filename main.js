// 테마 토글 로직
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  if (isDark) {
    body.removeAttribute('data-theme');
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 스크롤 시 내비게이션 바 그림자 효과
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'var(--shadow)';
  }
});
