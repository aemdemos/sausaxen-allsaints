/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant child section (with c-flexible-wrapper)
  const flex = element.querySelector('.c-flexible-wrapper');
  if (!flex) return;
  const container = flex.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  
  // Get both columns
  const cols = Array.from(row.children);
  let leftCol = null;
  let rightCol = null;
  // Determine which column is image and which is text
  cols.forEach(col => {
    if (col.classList.contains('c-two-col-generic__image-wrapper')) {
      rightCol = col;
    } else if (col.classList.contains('c-two-col-generic__text-wrapper')) {
      leftCol = col;
    }
  });

  // --- LEFT COLUMN (text) ---
  // Want the .c-card__content div for the left column
  let leftContent = '';
  if (leftCol) {
    const cardContent = leftCol.querySelector('.c-card__content');
    if (cardContent) {
      leftContent = cardContent;
    }
  }

  // --- RIGHT COLUMN (image) ---
  // Use background image from style
  let rightContent = '';
  if (rightCol) {
    const bg = rightCol.style && rightCol.style.backgroundImage;
    if (bg && bg.startsWith('url(')) {
      const urlMatch = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        rightContent = img;
      }
    }
  }

  // Table as per Columns (columns33) block
  // FIRST ROW: single header cell
  // SECOND ROW: two columns
  const cells = [
    ['Columns (columns33)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Ensure the first row has only one cell
  // Remove any extra th from the header row (if createTable generates one per cell)
  const headerRow = table.querySelector('tr');
  if (headerRow) {
    // If there are multiple th elements, merge their contents and remove all but the first
    const ths = headerRow.querySelectorAll('th');
    if (ths.length > 1) {
      // Merge text content
      let merged = '';
      ths.forEach((th, i) => {
        if (i === 0) merged = th.innerHTML;
        else merged += ' ' + th.innerHTML;
      });
      ths[0].innerHTML = merged.trim();
      // Remove extra ths
      for (let i = ths.length - 1; i > 0; i--) {
        ths[i].remove();
      }
    }
    // Set colspan to match number of columns in content row
    if (ths.length > 0) {
      ths[0].setAttribute('colspan', '2');
    }
  }

  element.replaceWith(table);
}
