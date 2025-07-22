/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table header
  const headerRow = ['Cards (cardsNoImages28)'];
  const cells = [headerRow];

  // Find all card containers inside the section
  const componentsWrapper = element.querySelector('.c-even-columns__components');
  if (!componentsWrapper) return;
  const cardContainers = componentsWrapper.querySelectorAll('.c-card__container--product');

  // For each card, collect its heading and description
  cardContainers.forEach(cardCont => {
    const content = cardCont.querySelector('.c-card--product__content');
    if (!content) return;
    const heading = content.querySelector('h3');
    const description = content.querySelector('.c-card--product__description');
    const rowContent = [];
    if (heading) rowContent.push(heading);
    if (description) rowContent.push(description);
    // Place the card's content in a single cell (array of elements)
    cells.push([rowContent]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
