/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the free text content block that contains the heading and paragraph
  const content = element.querySelector('.c-free-text__content');

  // Prepare an array to hold the text elements (heading and paragraph)
  const textCell = [];

  // Defensive: Only process if .c-free-text__content exists
  if (content) {
    // Find all headings (h1-h6) and paragraphs as direct children (semantic order)
    const children = Array.from(content.children);
    for (const child of children) {
      if (/^H[1-6]$/i.test(child.tagName) || child.tagName === 'P') {
        textCell.push(child);
      }
    }
  }
  // If .c-free-text__content is missing, fallback: extract any h1-h6 or p in element, in order
  if (textCell.length === 0) {
    const fallback = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    fallback.forEach(el => textCell.push(el));
  }

  // Construct table rows for Hero block (no background image row in this case)
  const cells = [
    ['Hero'], // Header row must be exactly 'Hero'
    [''],     // Background image row (empty as none present)
    [textCell]// Text row: heading(s) and paragraph(s)
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
