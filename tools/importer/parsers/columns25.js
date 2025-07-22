/* global WebImporter */
export default function parse(element, { document }) {
  // Find the flexible wrapper for column content
  const wrapper = element.querySelector('.c-flexible-wrapper');
  if (!wrapper) return;
  const container = wrapper.querySelector('.container');
  if (!container) return;
  const iconsRow = container.querySelector('.c-cvp-icons__items');
  if (!iconsRow) return;
  const columns = Array.from(iconsRow.children).map((col) => {
    // Gather all child nodes (img, content)
    const content = [];
    Array.from(col.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        content.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent;
        content.push(span);
      }
    });
    return content.length === 1 ? content[0] : content;
  });

  // Header row must be a single cell (matches example)
  const headerRow = ['Columns (columns25)'];
  // Second row: an array of columns (one cell per column)
  const columnsRow = columns;
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
