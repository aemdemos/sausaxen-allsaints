/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two-column wrapper
  const twoColSection = element.querySelector('.c-two-col-generic');
  if (!twoColSection) return;
  const colDivs = twoColSection.querySelectorAll('.row > div');

  // First column: image (background-image)
  let imgElem = null;
  if (colDivs.length > 0) {
    const imgCol = colDivs[0];
    if (imgCol && imgCol.style && imgCol.style.backgroundImage) {
      const bg = imgCol.style.backgroundImage;
      const match = bg.match(/url\(["']?(.+?)["']?\)/);
      if (match && match[1]) {
        imgElem = document.createElement('img');
        imgElem.src = match[1];
        imgElem.alt = '';
      }
    }
  }

  // Third column: card content
  let rightColContent = null;
  if (colDivs.length > 1) {
    const textCol = colDivs[1];
    let cardContent = null;
    let buttonWrapper = null;
    if (textCol) {
      const card = textCol.querySelector('.c-card');
      if (card) {
        cardContent = card.querySelector('.c-card__content');
        buttonWrapper = card.querySelector('.c-button-wrapper');
      }
    }
    if (cardContent && buttonWrapper) {
      rightColContent = document.createElement('div');
      rightColContent.append(cardContent, buttonWrapper);
    } else if (cardContent) {
      rightColContent = cardContent;
    } else if (buttonWrapper) {
      rightColContent = buttonWrapper;
    }
  }

  // Build the 3-column structure: left (image), middle (empty), right (text)
  const headerRow = ['Columns (columns3)'];
  const dataRow = [imgElem, '', rightColContent];
  const table = WebImporter.DOMUtils.createTable([headerRow, dataRow], document);
  element.replaceWith(table);
}
