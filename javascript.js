const apiKey = '3v7eYY8RXzq9Q9OTeANymChQHfZAcXLr';
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  resultsContainer.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();

    resultsContainer.innerHTML = '';

    if (data.data.length === 0) {
      resultsContainer.innerHTML = '<p>No GIFs found.</p>';
      return;
    }

    data.data.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      resultsContainer.appendChild(img);
    });

  } catch (error) {
    console.error('Error fetching Giphy API:', error);
    resultsContainer.innerHTML = '<p>Error loading GIFs.</p>';
  }
});