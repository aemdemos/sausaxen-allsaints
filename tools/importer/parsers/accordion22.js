/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block inside the element
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  const rows = [];
  // Header row as in the example
  rows.push(['Accordion (accordion22)']);

  // Find all accordion items
  const items = accordion.querySelectorAll('.c-accordion__item');
  items.forEach((item) => {
    // Title cell: extract the title from button span.item-title, or fallback to button textContent
    let titleContent = '';
    const btn = item.querySelector('.c-accordion__header-button');
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span) {
        titleContent = span.textContent.trim();
      } else {
        titleContent = btn.textContent.trim();
      }
    }

    // Content cell: get the innermost content wrapper with meaningful HTML/content
    // Prefer .c-accordion__content__details, fallback to .c-accordion__content
    let contentCell = '';
    const contentDetails = item.querySelector('.c-accordion__content__details');
    const contentRegion = item.querySelector('.c-accordion__content');
    if (contentDetails) {
      // Use all children nodes (not just the first child)
      const nodes = Array.from(contentDetails.childNodes).filter(node => {
        // Remove empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    } else if (contentRegion) {
      // Use all children if .c-accordion__content__details not found
      const nodes = Array.from(contentRegion.childNodes).filter(node => {
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    // else contentCell remains blank

    rows.push([titleContent, contentCell]);
  });

  // Create the table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
