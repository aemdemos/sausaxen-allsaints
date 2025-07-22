/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left (content) and right (image) columns
  const contentWrapper = element.querySelector('.c-hero-header-key-callout__content-wrapper');
  const imageWrapper = element.querySelector('.c-hero-header-key-callout__image-wrapper');

  // Reference the left column: use the actual .c-content-container (to preserve structure, heading, etc.)
  let leftCellContent = null;
  if (contentWrapper) {
    const contentContainer = contentWrapper.querySelector('.c-content-container');
    if (contentContainer) {
      leftCellContent = contentContainer;
    } else {
      leftCellContent = contentWrapper;
    }
  }

  // Reference the right column: create image element from the background image
  let rightCellContent = '';
  if (imageWrapper) {
    // Try to get the largest possible image from inline styles
    const style = imageWrapper.getAttribute('style') || '';
    let imageUrl = '';
    // Look for --image-large, fallback to --image-medium, then --image-small
    const largeMatch = style.match(/--image-large: url\('(.*?)'\)/);
    const mediumMatch = style.match(/--image-medium: url\('(.*?)'\)/);
    const smallMatch = style.match(/--image-small: url\('(.*?)'\)/);
    if (largeMatch && largeMatch[1]) {
      imageUrl = largeMatch[1];
    } else if (mediumMatch && mediumMatch[1]) {
      imageUrl = mediumMatch[1];
    } else if (smallMatch && smallMatch[1]) {
      imageUrl = smallMatch[1];
    }
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '';
      rightCellContent = img;
    }
  }

  // Build the table with a single-cell header row
  const headerRow = ['Columns (columns18)']; // Single cell header, spans columns
  const contentRow = [leftCellContent, rightCellContent]; // Content row with two columns
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
