/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main rates and fees container
  const main = element.querySelector('.c-hl-rates-and-fees__container');
  if (!main) return;

  // Find each main content section (each .u-padding-t-b)
  const sections = Array.from(main.querySelectorAll(':scope > .u-padding-t-b'));

  sections.forEach(section => {
    // Find the heading, description, and the table
    const content = section.querySelector('.c-hl-rates-and-fees__content');
    const heading = content ? content.querySelector('h2, h3, h4, h5, h6') : null;
    const para = content ? content.querySelector('p') : null;
    const tableContainer = section.querySelector('.c-hl-rates-and-fees__table-container');
    const scrollContainer = tableContainer ? tableContainer.querySelector('.c-hl-rates-and-fees__scroll-container') : null;
    const table = scrollContainer ? scrollContainer.querySelector('table') : null;
    
    // Only continue if there is a table for this section
    if (table) {
      // Compose the table cells as per the block structure
      // Header row is always block name 'Table'
      const cells = [['Table']];
      // Compose a div to hold all section content (heading + para + table)
      const wrapper = document.createElement('div');
      if (heading) wrapper.appendChild(heading);
      if (para) wrapper.appendChild(para);
      wrapper.appendChild(table);
      cells.push([wrapper]);
      // Create the block table
      const block = WebImporter.DOMUtils.createTable(cells, document);
      // Insert block before this section in the DOM, then remove this section
      section.parentNode.insertBefore(block, section);
      section.remove();
    }
  });

  // Finally, remove the original container if empty
  if (main.childElementCount === 0) {
    main.parentNode.removeChild(main);
  }

  // Remove the original element if it is empty
  if (element.childElementCount === 0) {
    element.remove();
  }
}
