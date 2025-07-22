/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the deepest left/right columns for the content
  // Find the first nested .container > .row containing columns
  let colRow = null;
  const containers = element.querySelectorAll('.container');
  for (const cont of containers) {
    const row = cont.querySelector(':scope > .row');
    if (row && (row.querySelector('.col-md-8') || row.querySelector('.col-md-4'))) {
      colRow = row;
      break;
    }
  }
  if (!colRow) return;

  // Extract the left and right columns; content is in col-md-8 and col-md-4
  let leftCol = colRow.querySelector('.col-md-8');
  let rightCol = colRow.querySelector('.col-md-4');
  // Robustness: rightCol may also have col-xs-12
  if (!rightCol) {
    rightCol = Array.from(colRow.children).find(el => el.classList.contains('col-md-4'));
  }
  if (!leftCol || !rightCol) return;

  // Use the direct column elements as the table cells, do not clone
  const cells = [
    ['Columns (columns13)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
