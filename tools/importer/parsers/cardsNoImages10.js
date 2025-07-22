/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block with the cards
  const flexibleWrapper = element.querySelector('.c-flexible-wrapper.c-benefits');
  if (!flexibleWrapper) return;
  const container = flexibleWrapper.querySelector('.container');
  if (!container) return;
  const cardItems = Array.from(container.querySelectorAll(':scope > .c-benefits__item'));

  const rows = [];
  // Add block header as in the sample
  rows.push(['Cards (cardsNoImages10)']);

  cardItems.forEach((item) => {
    const content = [];
    const caption = item.querySelector('.c-caption-wrapper');
    if (!caption) return;
    // Heading: either h2 or h3
    const heading = caption.querySelector('h2, h3');
    if (heading) content.push(heading);
    // The first meaningful paragraph (not empty, not pure whitespace)
    const paragraphs = Array.from(caption.querySelectorAll('p'));
    const description = paragraphs.find(p => p.textContent.replace(/\u00a0/g, '').trim().length > 0);
    if (description) content.push(description);
    // CTA (optional)
    const cta = caption.querySelector('.c-button-wrapper a');
    if (cta) content.push(cta);
    // Place all card content in a single cell (array) to preserve structure
    rows.push([content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
