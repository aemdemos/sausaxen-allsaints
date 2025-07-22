/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate children of the top-level element
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find the form (left column) and the results (right column)
  const formCol = children.find(child => child.classList.contains('c-refinance-calculator__form'));
  const resultsCol = children.find(child => child.classList.contains('c-refinance-calculator__results'));

  // Prepare the columns row; if resultsCol is missing, fill with empty string
  const columnsRow = [formCol || '', resultsCol || ''];

  // Construct the table array as per Columns block spec and example
  const table = [
    ['Columns (columns15)'],
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
