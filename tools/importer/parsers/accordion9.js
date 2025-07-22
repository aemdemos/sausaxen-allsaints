/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main accordion element within the block
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Prepare the table rows array: first row is the header
  const rows = [['Accordion (accordion9)']];

  // For each accordion item, extract the title and content
  const items = accordion.querySelectorAll('.c-accordion__item');
  items.forEach((item) => {
    // Title cell: use the span with class item-title if available
    let titleCell = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        titleCell = span;
      } else {
        titleCell = button;
      }
    }

    // Content cell: use the details div if possible, else content wrapper
    let contentCell = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      contentCell = details;
    } else {
      const content = item.querySelector('.c-accordion__content');
      if (content) contentCell = content;
    }

    // Add the row if at least a title is found
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create and replace with the new table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
