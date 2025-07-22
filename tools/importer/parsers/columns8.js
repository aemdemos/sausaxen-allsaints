/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row wrapper inside the provided section
  const row = element.querySelector('.row');
  if (!row) return;

  // Get immediate child columns of the row
  const cols = Array.from(row.children).filter(col => col.classList.contains('col-sm-6') || col.classList.contains('col-sm-5') || col.classList.contains('col-sm-7'));
  if (cols.length < 2) return;

  // First column: should be the image column
  const imageCol = cols.find(col => col.className.includes('image-wrapper')) || cols[0];
  // Second column: should be the text column
  const textCol = cols.find(col => col.className.includes('text-wrapper')) || cols[1];

  // --- IMAGE CELL ---
  // Try to extract the background image from style
  let imgElem = null;
  if (imageCol && imageCol.style && imageCol.style.backgroundImage) {
    const bgUrlMatch = imageCol.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (bgUrlMatch && bgUrlMatch[1]) {
      imgElem = document.createElement('img');
      imgElem.src = bgUrlMatch[1];
      imgElem.alt = '';
    }
  }

  // --- CONTENT CELL ---
  // Reference all meaningful content inside the textCol
  // Usually inside .c-card > .c-card__content
  let contentCell = null;
  const cardContent = textCol.querySelector('.c-card__content') || textCol;
  if (cardContent) {
    // We'll gather all direct children (h2, p, div with links, etc)
    const frag = document.createDocumentFragment();
    Array.from(cardContent.children).forEach(child => {
      frag.appendChild(child);
    });
    contentCell = frag;
  }

  // Structure: columns block, header and second row with img and content
  const headerRow = ['Columns (columns8)'];
  const dataRow = [imgElem, contentCell];

  const cells = [headerRow, dataRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
