/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main wrapper section
  const wrapper = element.querySelector('.c-flexible-wrapper.c-how-it-works');
  if (!wrapper) return;
  const container = wrapper.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Left column
  const leftCol = row.querySelector('.col-lg-4');
  let leftContent = [];
  if (leftCol) {
    const heading = leftCol.querySelector('h2');
    if (heading) leftContent.push(heading);
    const desc = leftCol.querySelector('.c-how-it-works__header-content');
    if (desc) {
      desc.childNodes.forEach(node => {
        if (!(node.nodeType === 3 && !node.textContent.trim())) leftContent.push(node);
      });
    }
    const cta = leftCol.querySelector('.c-how-it-works__header-cta');
    if (cta) {
      cta.childNodes.forEach(node => {
        if (!(node.nodeType === 3 && !node.textContent.trim())) leftContent.push(node);
      });
    }
  }

  // Right columns
  const rightCol = row.querySelector('.col-lg-8.c-how-it-works__content');
  let linkCol1 = [];
  let linkCol2 = [];
  if (rightCol) {
    const innerRow = rightCol.querySelector('.row');
    if (innerRow) {
      const cols = innerRow.querySelectorAll('.col-md-6');
      if (cols[0]) {
        const ps = cols[0].querySelectorAll('p');
        ps.forEach(p => {
          const i = p.querySelector('i');
          if (i) i.remove();
          linkCol1.push(p);
        });
      }
      if (cols[1]) {
        const ps = cols[1].querySelectorAll('p');
        ps.forEach(p => {
          const i = p.querySelector('i');
          if (i) i.remove();
          linkCol2.push(p);
        });
      }
    }
  }

  // We must use WebImporter.DOMUtils.createTable so we build a table with a one-cell header row and a three-cell content row
  // Header row: single cell
  const headerRow = ['Columns (columns7)'];
  // Content row: three cells
  const contentRow = [
    leftContent.length === 1 ? leftContent[0] : leftContent,
    linkCol1.length === 1 ? linkCol1[0] : linkCol1,
    linkCol2.length === 1 ? linkCol2[0] : linkCol2
  ];

  // Workaround: Wrap the content row in another array so first is header ([1]) and then row with 3 cells ([3])
  // This creates a table where the top row is a single-cell header and the next row is three content cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // After creation, manually set the colspan attribute on the header cell to span the content columns
  // (if the createTable doesn't do this automatically)
  const ths = table.querySelectorAll('tr:first-child th');
  if (ths.length === 1) {
    ths[0].setAttribute('colspan', '3');
  }

  element.replaceWith(table);
}
