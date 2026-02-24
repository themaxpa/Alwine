// poetic-highlight.js

// Wrap words and highlight word by word
function initPoeticHighlight() {
  const paragraphs = document.querySelectorAll('.text-color-muted');

  paragraphs.forEach(p => {
    const words = p.innerText.split(' ').map(word => `<span>${word}</span>`).join(' ');
    p.innerHTML = words;
  });

  let allWords = document.querySelectorAll('.text-color-muted span');
  let index = 0;

  function highlightNextWord() {
    allWords.forEach(w => w.classList.remove('highlight'));
    allWords[index].classList.add('highlight');

    index++;
    if (index >= allWords.length) index = 0; // loop continuously
  }

  setInterval(highlightNextWord, 700); // adjust speed here
}

// Initialize on page load
window.addEventListener('load', initPoeticHighlight);