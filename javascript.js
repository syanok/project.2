

// Giphy Search Logic
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  const apiKey = '3v7eYY8RXzq9Q9OTeANymChQHfZAcXLr';
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=12`;

  try {
    const res = await fetch(endpoint);
    const json = await res.json();
    const gifs = json.data;

    resultsContainer.innerHTML = '';

    if (gifs.length === 0) {
      resultsContainer.innerHTML = '<p>No GIFs found.</p>';
      return;
    }

    gifs.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      resultsContainer.appendChild(img);
    });
  } catch (err) {
    console.error('Error fetching GIFs:', err);
    resultsContainer.innerHTML = '<p>Error fetching GIFs.</p>';
  }
});

// Toggle Hamburger Nav
const toggleBtn = document.getElementById('menu-toggle');
const navContent = document.getElementById('nav-content');

toggleBtn.addEventListener('click', () => {
  navContent.classList.toggle('active');
});

// ===== Contact Form (Formspree) =====
const contactForm = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show a “sending…” message
    messageDiv.textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        messageDiv.textContent = 'Thanks for your message! We’ll get back to you soon.';
        messageDiv.style.color = 'green';
        contactForm.reset();
      } else {
        messageDiv.textContent = 'Oops, something went wrong. Please try again.';
        messageDiv.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      messageDiv.textContent = 'Network error. Please try later.';
      messageDiv.style.color = 'red';
    }
  });
}
