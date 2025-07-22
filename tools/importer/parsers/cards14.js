/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel's swiper wrapper that contains all the cards
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  
  // Get all the card slides
  const slides = swiperWrapper.querySelectorAll('.swiper-slide .c-product-selector__card');

  // Table header exactly as in the example
  const rows = [
    ['Cards (cards14)']
  ];

  slides.forEach(card => {
    // There is no image/icon in this variant, so the first cell is an empty string
    let leftCell = '';
    
    // Build the right cell with all relevant content, referencing existing elements only
    const contentElements = [];

    // Motivator (e.g. 'Basic Home Loan')
    const motivator = card.querySelector('.c-hl-motivator');
    if (motivator) contentElements.push(motivator);

    // Product title and sublist (e.g. 'Variable', 'Fixed 1 year', etc. with list)
    const product = card.querySelector('.c-product-selector__card__product');
    if (product) contentElements.push(product);

    // Rates
    const rates = card.querySelector('.c-product-selector__card__rates');
    if (rates) contentElements.push(rates);

    // Features
    const features = card.querySelector('.c-product-selector__card__features');
    if (features) contentElements.push(features);

    // Repayment info
    const repayments = card.querySelector('.c-product-selector__card__repayments');
    if (repayments) contentElements.push(repayments);

    rows.push([leftCell, contentElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
