// Import our custom CSS
import '../scss/styles.scss'

import cardMetadata from '../../dependencies/card-metadata.json';
const cardImages = import.meta.glob("../../dependencies/card-images/*.png");

const cardContent = document.getElementById('card-content');

async function addImages() {
  for (const key in cardMetadata) {
    const {title, level, type} = cardMetadata[key];

    if (level < 0) continue;

    const imageUrl = await cardImages["../../dependencies/card-images/" + key + ".png"]();
    const thisCard = document.createElement("div");
    thisCard.classList.add('col');
    // <img src="..." class="card-img-top" alt="...">
    thisCard.innerHTML = `
      <div class="card">
      <img src="${imageUrl.default}" class="card-img-top" alt="Card image">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-subtitle mb-2 text-body-secondary">${type} ${level}</p>
      </div>
      </div>
    `;
    cardContent.appendChild(thisCard);
  }
}

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

addImages();