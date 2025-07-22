/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main .row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;
  const columns = Array.from(row.children);
  if (columns.length < 2) return;
  // Reference the first column (usually small heading or intro)
  const col1 = columns[0];
  // Reference the second column (detailed content)
  const col2 = columns[1];

  // Build the block table as per 'Columns (columns21)' pattern
  const headerRow = ['Columns (columns21)'];
  const contentRow = [col1, col2];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
