/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row container
  const row = element.querySelector('.row');
  if (!row) return;
  // Find direct child columns
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const left = columns[0];
  const right = columns[1];

  // --- Edge case: Ensure content is present ---
  // If a column is empty, provide an empty div to keep structure
  const leftCell = left.childNodes.length ? left : document.createElement('div');
  const rightCell = right.childNodes.length ? right : document.createElement('div');

  // Block table header must match spec exactly
  const headerRow = ['Columns (columns24)'];
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace element with the block table
  element.replaceWith(table);
}