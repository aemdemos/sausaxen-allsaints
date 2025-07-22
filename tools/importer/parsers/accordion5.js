/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Accordion (accordion5)'];

  // Find all direct child accordion items
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));
  const rows = items.map((item) => {
    // Title: Use the .item-title span within the button, reference it directly
    const titleButton = item.querySelector('.c-accordion__header-button');
    let titleSpan = titleButton && titleButton.querySelector('.item-title');
    // Fallback: If .item-title span missing, use button itself
    const titleCell = titleSpan || titleButton || '';

    // Content: Use all nodes inside .c-accordion__content__details
    const contentDetails = item.querySelector('.c-accordion__content__details');
    let contentCell = '';
    if (contentDetails) {
      // Gather all non-empty child nodes (preserve semantic structure: paragraphs, lists, links, etc)
      const contentNodes = Array.from(contentDetails.childNodes).filter((node) => {
        // filter out empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      contentCell = contentNodes.length > 1 ? contentNodes : (contentNodes[0] || '');
    }
    return [titleCell, contentCell];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
