/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get main intro content (heading + description)
  const introContent = container.querySelector('.c-repayment-calculator__content');
  // Get the calculator (form and results)
  const calcContainer = container.querySelector('.c-repayment-calculator__container');
  if (!calcContainer) return;

  // The form (left column)
  const form = calcContainer.querySelector('.c-repayment-calculator__form');
  // The results (right column)
  const results = calcContainer.querySelector('.c-repayment-calculator__results');

  // Build columns: left = intro + form, right = results
  const leftCol = [];
  if (introContent) leftCol.push(introContent);
  if (form) leftCol.push(form);
  // If both intro and form exist, join with a <br> for better separation
  const leftCell = leftCol.length === 2 ? [leftCol[0], document.createElement('br'), leftCol[1]] : leftCol;

  const rightCell = results ? [results] : [];

  // Prepare table structure
  const headerRow = ['Columns (columns34)'];
  const blockRows = [headerRow, [leftCell, rightCell]];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace the element
  element.replaceWith(table);
}
