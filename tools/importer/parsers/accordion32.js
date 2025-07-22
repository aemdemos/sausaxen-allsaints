/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll(':scope > .c-accordion__item');

  // Build rows; first row is header
  const rows = [['Accordion (accordion32)']];

  // For each accordion item, extract title (as HTML element) and content (as HTML element)
  items.forEach((item) => {
    // Get title element (the .item-title span inside button)
    let titleEl = null;
    const button = item.querySelector('button.c-accordion__header-button');
    if (button) {
      const itemTitle = button.querySelector('.item-title');
      if (itemTitle) {
        titleEl = itemTitle;
      } else {
        // Fallback: use button text, as <span>
        titleEl = document.createElement('span');
        titleEl.textContent = button.textContent.trim();
      }
    } else {
      // Fallback: use h3 text as <span>
      const h3 = item.querySelector('h3');
      titleEl = document.createElement('span');
      titleEl.textContent = h3 ? h3.textContent.trim() : '';
    }

    // Get content: use the '.c-accordion__content__details' div (contains all content for this item)
    let contentEl = item.querySelector('.c-accordion__content__details');
    if (!contentEl) {
      // Fallback: try '.c-accordion__content' if details missing
      contentEl = item.querySelector('.c-accordion__content');
    }

    // If contentEl is null, create an empty cell
    rows.push([
      titleEl,
      contentEl || document.createElement('div')
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
