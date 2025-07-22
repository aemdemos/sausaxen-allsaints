/* global WebImporter */
export default function parse(element, { document }) {
  // This HTML only contains a separator (hr), with no cards/content. There are no card images, text, or metadata in this section.
  // Per the markdown example and specification, if there are no cards present, only output the block header row, no content rows.
  // There is also no Section Metadata in the markdown example for this block, so we don't create one.
  const cells = [
    ['Cards (cards1)']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}