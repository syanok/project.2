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