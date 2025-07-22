/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.container .row.u-flex-wrapper');
  if (!row) return;

  // Get all columns
  const columns = Array.from(row.querySelectorAll(':scope > .col-md-6.u-flex'));

  // Header row: single cell array, per markdown example
  const headerRow = ['Columns (columns23)'];

  // Content row: collect content for each column
  const contentRow = columns.map((col) => {
    const cardInner = col.querySelector('.c-card__inner');
    const frag = document.createElement('div');
    if (cardInner) {
      // Move heading/content
      const content = cardInner.querySelector('.c-card__content');
      if (content) {
        while (content.firstChild) {
          frag.appendChild(content.firstChild);
        }
      }
      // Move buttons
      const buttonWrap = cardInner.querySelector('.c-button-wrapper-stack');
      if (buttonWrap) {
        while (buttonWrap.firstChild) {
          frag.appendChild(buttonWrap.firstChild);
        }
      }
    }
    return frag;
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // single cell header row
    contentRow // N cells for columns
  ], document);
  
  // Replace original element
  element.replaceWith(table);
}
