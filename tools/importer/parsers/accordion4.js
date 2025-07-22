/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main accordion block inside the given element
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Set up the header row exactly as required
  const headerRow = ['Accordion (accordion4)'];
  const rows = [headerRow];

  // Get all direct accordion items
  const items = accordion.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // Extract the title text from the button/span
    let titleText = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span && span.textContent) {
        titleText = span.textContent.trim();
      } else {
        titleText = button.textContent.trim();
      }
    }
    // Guarantee fallback if missing
    if (!titleText) titleText = '';

    // Extract the content element for the accordion body
    let contentElem = item.querySelector('.c-accordion__content__details');
    if (!contentElem) {
      // Try to find the general content region if specific details missing
      const region = item.querySelector('.c-accordion__content');
      if (region) {
        contentElem = region;
      } else {
        // Always have a DOM element to reference
        contentElem = document.createElement('div');
      }
    }

    // Add the row: title (as string), content (as element reference)
    rows.push([
      titleText,
      contentElem
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
