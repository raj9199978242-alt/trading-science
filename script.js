document.querySelectorAll('.menu-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const links = button.closest('.nav')?.querySelector('.links');
    const isOpen = links?.classList.toggle('open') ?? false;
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.nav')) return;
  document.querySelectorAll('.links.open').forEach((links) => links.classList.remove('open'));
  document.querySelectorAll('.menu-toggle[aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.links.open').forEach((links) => links.classList.remove('open'));
  document.querySelectorAll('.menu-toggle[aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.site-explore-menu[open]').forEach((menu) => menu.removeAttribute('open'));
});

document.querySelectorAll('video').forEach((video) => {
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
});

document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = encodeURIComponent('Hello Trading Science,\n\nMy Name: ' + (data.get('name') || '') + '\nPhone Number: ' + (data.get('phone') || '') + '\nEmail: ' + (data.get('email') || '') + '\nMessage: ' + (data.get('message') || '') + '\n\nI would like to book a 1-to-1 Zoom session.');
    window.open('https://wa.me/919211412456?text=' + text, '_blank', 'noopener');
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}
