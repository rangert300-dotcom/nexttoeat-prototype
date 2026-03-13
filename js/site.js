/**
 * site.js - Shared JavaScript for Next To Eat prototype
 * Handles promo bar, mobile nav, active links, footer year, and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
  initPromoBar();
  initMobileNav();
  initActiveNavLinks();
  initFooterYear();
  initSmoothScroll();
});

/**
 * Promo bar dismissal
 */
function initPromoBar() {
  const promoCloseBtn = document.querySelector('.promo-close');
  const promoBar = document.querySelector('.promo');
  const siteHeader = document.querySelector('.site-header');

  if (promoCloseBtn) {
    promoCloseBtn.addEventListener('click', function() {
      if (promoBar) {
        promoBar.style.display = 'none';
      }
      if (siteHeader) {
        siteHeader.classList.remove('has-promo');
      }
    });
  }
}

/**
 * Mobile hamburger menu
 */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavPanel = document.querySelector('.mobile-nav-panel');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const body = document.body;

  if (!hamburger || !mobileNav) return;

  // Hamburger button opens menu
  hamburger.addEventListener('click', function() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    body.style.overflow = 'hidden';
  });

  // Mobile nav close button
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function() {
      closeMobileNav();
    });
  }

  // Backdrop click closes menu
  mobileNav.addEventListener('click', function(e) {
    // Only close if clicking on the backdrop (mobileNav itself), not on content inside
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });

  // Escape key closes menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    if (hamburger) {
      hamburger.classList.remove('open');
    }
    mobileNav.classList.remove('open');
    body.style.overflow = '';
  }

  // Close menu when clicking on nav links (optional - helps UX on mobile)
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMobileNav();
    });
  });
}

/**
 * Set active nav link based on current page URL
 */
function initActiveNavLinks() {
  const currentPage = getCurrentPagePath();
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && isActiveLink(href, currentPage)) {
      link.classList.add('active');
    }
  });
}

/**
 * Get current page path for comparison
 */
function getCurrentPagePath() {
  let path = window.location.pathname.toLowerCase();
  // Normalize path: remove trailing slash and .html extension
  path = path.replace(/\/$/, '') || '/';
  path = path.replace(/\.html$/, '');
  return path;
}

/**
 * Check if a link matches the current page
 */
function isActiveLink(href, currentPage) {
  href = href.toLowerCase().replace(/\.html$/, '');

  // Handle root/index
  if (href === '/' || href === '/index' || href === '') {
    return currentPage === '/' || currentPage === '/index' || currentPage === '';
  }

  // Remove leading slash for comparison
  const hrefPath = href.replace(/^\//, '');
  const currentPath = currentPage.replace(/^\//, '');

  return hrefPath === currentPath || currentPage.includes(hrefPath);
}

/**
 * Set footer year to current year
 */
function initFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return; // Ignore links to just '#'

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}
