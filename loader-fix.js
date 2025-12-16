// Disable loader - show content immediately
const loaderWrapper = document.querySelector('.loader-wrapper');
const pageReveal = document.querySelector('.page-reveal');

if (loaderWrapper) loaderWrapper.style.display = 'none';
if (pageReveal) pageReveal.style.display = 'none';
document.body.classList.add('page-loaded');
