/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Each card is a nav item (or button), login button, or search button
  // We'll extract these in a way that matches the visible text content, using references to the actual DOM elements.

  // 1. Navigation items (main horizontal nav bar)
  const navSection = element.querySelector('.cmp-header__navigation-section nav');
  if (navSection) {
    const navItems = navSection.querySelectorAll(':scope > .cmp-header__primary-nav-item');
    navItems.forEach((item) => {
      // Dropdown menu links (multiple cards)
      const dropdown = item.querySelector('.cmp-header__dropdown-menu');
      if (dropdown) {
        dropdown.querySelectorAll('a').forEach((link) => {
          rows.push(['', link]);
        });
      } else {
        // Main nav links (single card)
        const link = item.querySelector('a');
        if (link) {
          rows.push(['', link]);
        } else {
          // Button nav (e.g., Calculators), use the button as is
          const button = item.querySelector('button');
          if (button) {
            rows.push(['', button]);
          }
        }
      }
    });
  }

  // 2. Login button
  const loginBtn = element.querySelector('.cmp-header__user-info-section a.cmp-header__external-login-cta');
  if (loginBtn) {
    rows.push(['', loginBtn]);
  }

  // 3. Search button ("Search" on right side)
  const searchBtn = element.querySelector('.cmp-header__search-button-wrapper button.cmp-search-button-desktop');
  if (searchBtn) {
    rows.push(['', searchBtn]);
  }

  // 4. Fallback: If no nav or buttons found, include all visible text in the header as a single card
  if (rows.length === 1) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.textContent = element.textContent;
    rows.push(['', fallbackDiv]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
