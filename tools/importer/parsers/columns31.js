/* global WebImporter */
export default function parse(element, { document }) {
  // Find inner section which contains the columns
  const innerSection = element.querySelector('section.c-flexible-wrapper');
  if (!innerSection) return;
  const container = innerSection.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Get columns (should be 2, but robust for more)
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Prepare the array for the cells in the second row
  const cells = [];
  columns.forEach((col) => {
    // Include all non-empty child nodes (elements and text nodes)
    const content = Array.from(col.childNodes).filter(node => {
      // Keep elements, and text nodes with non-whitespace text
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '');
    });
    // If only one content, pass as is, else as array
    if (content.length === 1) {
      cells.push(content[0]);
    } else {
      cells.push(content);
    }
  });

  // Header row: block name exactly as specified
  const headerRow = ['Columns (columns31)'];

  // Build table and replace element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);

  element.replaceWith(table);
}
