/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content row that contains the two columns
  const mainRow = element.querySelector('.c-free-text__content > .container > .row');
  if (!mainRow) return;

  // Left column has heading and description (could be in col-xs-12 col-md-8)
  const leftCol = mainRow.querySelector('.col-xs-12.col-md-8');
  // Right column contains the images (could be in col-xs-12 col-md-4)
  const rightCol = mainRow.querySelector('.col-xs-12.col-md-4');

  if (!leftCol || !rightCol) return;

  // Per guidelines: header row is block name EXACTLY
  const headerRow = ['Columns (columns19)'];
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
