/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table, matches the example exactly
  const headerRow = ['Accordion (accordion29)'];

  // Get all accordion items (direct children)
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  const rows = [headerRow];

  items.forEach(item => {
    // Title: get the button text with .c-accordion__header-button > .item-title
    let title = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }

    // Content: get the .c-accordion__content__details (may have multiple children)
    let contentCell;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Use all child nodes (not just children: include text, e.g. line breaks)
      const nodes = Array.from(details.childNodes).filter(node => {
        // Ignore empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    } else {
      contentCell = '';
    }

    rows.push([title, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
