/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost accordion container
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  const headerRow = ['Accordion (accordion11)'];
  const rows = [headerRow];

  // Select all accordion items
  const items = accordion.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title cell: .item-title span inside button
    let title = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const titleSpan = button.querySelector('.item-title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }

    // Content cell: Use the whole .c-accordion__content__details div if present, else fallback
    let contentCell = null;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      contentCell = details;
    } else {
      // fallback to .c-accordion__content or an empty string
      const content = item.querySelector('.c-accordion__content');
      if (content) {
        contentCell = content;
      } else {
        contentCell = document.createTextNode('');
      }
    }
    rows.push([title, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
