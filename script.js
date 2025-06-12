const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardBtn = document.getElementById('addCardBtn');
const cardsContainer = document.getElementById('cards-container');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];



function saveAndRenderCards() {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
  renderCards();
}

function renderCards() {
  cardsContainer.innerHTML = '';
  flashcards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.innerHTML = `
      <strong>Q:</strong> ${card.question} <br>
      <strong>A:</strong> ${card.answer}
      <span class="delete" onclick="deleteCard(${index})"><i class="fas fa-trash"></i></span>
    `;

    cardsContainer.appendChild(cardDiv);
  });
}

function deleteCard(index) {
  flashcards.splice(index, 1);
  saveAndRenderCards();
}

addCardBtn.addEventListener('click', () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (question && answer) {
    flashcards.push({ question, answer });
    questionInput.value = '';
    answerInput.value = '';
    saveAndRenderCards();
  }
});

renderCards(); // initial load


