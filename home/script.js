// Smooth scroll on button click
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
});
