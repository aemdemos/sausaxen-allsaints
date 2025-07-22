/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract the background image URL from the style attribute
  function extractBgUrl(wrapper) {
    if (!wrapper) return null;
    const style = wrapper.getAttribute('style') || '';
    // Prefer large > medium > small
    let match = /--image-large:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (match && match[1]) return match[1];
    match = /--image-medium:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (match && match[1]) return match[1];
    match = /--image-small:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (match && match[1]) return match[1];
    return null;
  }

  // 1. Header row (block name EXACTLY as in the example)
  const headerRow = ['Columns (columns26)'];

  // 2. Image row (the decorative hero image)
  const imageWrapper = element.querySelector('.c-hero-header-key-callout__image-wrapper');
  let imageRow;
  const bgUrl = extractBgUrl(imageWrapper);
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    imageRow = [img];
  } else {
    imageRow = [''];
  }

  // 3. Content row (headline, subheading, CTAs, widget)
  const contentWrapper = element.querySelector('.c-hero-header-key-callout__content-wrapper');
  let contentCell = [];
  if (contentWrapper) {
    // The main container for content
    const containerBody = contentWrapper.querySelector('.c-content-container__body');
    if (containerBody) {
      // Heading (h1)
      const h1 = containerBody.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Supporting copy (optional)
      const supporting = containerBody.querySelector('.c-content-container__supporting-copy');
      if (supporting) {
        // Push all child nodes (should just be <p>, but resilient)
        Array.from(supporting.childNodes).forEach(node => contentCell.push(node));
      }
      // Rates widget (optional)
      const ratesWidget = containerBody.querySelector('.c-hl-rates-widget');
      if (ratesWidget) contentCell.push(ratesWidget);
      // CTA buttons
      const ctaWrapper = containerBody.querySelector('.c-button-wrapper-stack');
      if (ctaWrapper) {
        // Only push anchors (for semantic intent)
        ctaWrapper.querySelectorAll('a').forEach(a => contentCell.push(a));
      }
    }
  }
  // Always provide a cell (even if empty, for edge cases)
  if (contentCell.length === 0) contentCell = [''];

  // Compose the table
  const cells = [
    headerRow,         // row 1: block name
    imageRow,          // row 2: background image (or blank)
    [contentCell]      // row 3: main content (all relevant elements)
  ];

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
