/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Start with header row as specified in the block info
  const headerRow = ['Accordion (accordion27)'];
  const rows = [headerRow];

  // Find all accordion items
  const items = accordion.querySelectorAll('.c-accordion__item');
  items.forEach((item) => {
    // Title cell: get the text of the .item-title within the button
    const itemTitle = item.querySelector('.c-accordion__header-button .item-title');
    let titleCell = '';
    if (itemTitle) {
      // Reference the span for markup, as per requirements
      titleCell = itemTitle;
    }

    // Content cell: reference the entire details block if it exists, else the content wrapper, else blank
    let contentCell = '';
    const contentDetails = item.querySelector('.c-accordion__content__details');
    if (contentDetails) {
      contentCell = contentDetails;
    } else {
      const contentRegion = item.querySelector('.c-accordion__content');
      if (contentRegion) {
        contentCell = contentRegion;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
