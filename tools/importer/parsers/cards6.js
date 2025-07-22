/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example:
  const headerRow = ['Cards (cards6)'];

  // 2. Get the card container (three columns)
  const cardsWrapper = element.querySelector('.c-even-columns__components');
  if (!cardsWrapper) return;

  // 3. Extract all direct card containers for the cards
  const cardNodes = Array.from(cardsWrapper.querySelectorAll(':scope > .c-card__container--product'));
  const rows = cardNodes.map(cardNode => {
    // Icon or image (first cell)
    let icon = cardNode.querySelector('.icon-wrapper');
    icon = icon ? icon : '';

    // Text cell: heading (h3), description (p), CTA (a)
    const textCell = document.createElement('div');
    // Heading
    const heading = cardNode.querySelector('.c-card--product__heading');
    if (heading) textCell.appendChild(heading);
    // Description
    const desc = cardNode.querySelector('.c-card--product__description');
    if (desc) {
      // The description may be a <div> with a <p>, so add children properly
      Array.from(desc.childNodes).forEach(child => textCell.appendChild(child));
    }
    // CTA
    const ctaWrapper = cardNode.querySelector('.c-button-wrapper-stack');
    if (ctaWrapper) {
      const cta = ctaWrapper.querySelector('a');
      if (cta) textCell.appendChild(cta);
    }
    return [icon, textCell];
  });

  // 4. Compose the table structure and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
