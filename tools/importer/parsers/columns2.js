/* global WebImporter */
export default function parse(element, { document }) {
  // Find the calculator wrapper section
  const calculatorSection = element.querySelector('.c-flexible-wrapper.c-borrowing-calculator');
  if (!calculatorSection) return;

  const container = calculatorSection.querySelector('.container');
  if (!container) return;

  // Left column: intro content
  const introContent = container.querySelector('.c-borrowing-calculator__content');
  // Right column: calculator (form + result)
  const calculatorCol = container.querySelector('.c-borrowing-calculator__container');

  // Compose the columns for the second row (must have as many columns as required)
  const row = [];
  if (introContent) row.push(introContent);
  if (calculatorCol) row.push(calculatorCol);

  // The header row must be a single column/one cell array
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns2)'], // header row: one cell only
    row // content row: as many columns as needed
  ], document);

  element.replaceWith(table);
}
