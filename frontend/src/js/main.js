// Import our custom CSS
import '../scss/styles.scss'

import cardMetadata from '../../dependencies/card-metadata.json';

const cardImages = import.meta.glob("../../dependencies/card-images/*.png");

console.log(cardMetadata, cardImages);

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'