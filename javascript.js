const toggleButton = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');


toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});


// Search functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const items = searchResults.getElementsByTagName('li');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();

  for (let item of items) {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? '' : 'none';
  }
});
