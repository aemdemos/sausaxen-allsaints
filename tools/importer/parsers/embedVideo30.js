/* global WebImporter */
export default function parse(element, { document }) {
  // The HTML contains only a separator, no embed content.
  const headerRow = ['Embed'];
  // Content cell must be empty as there's nothing to embed
  const cells = [
    headerRow,
    ['']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}