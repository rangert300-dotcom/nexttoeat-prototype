/**
 * yam.js - Y.A.M. Page Animations
 * Handles fade-in IntersectionObserver for staggered animations
 */

document.addEventListener('DOMContentLoaded', function() {
  initFadeInObserver();
});

/**
 * Initialize fade-in animation with IntersectionObserver
 * Elements with .fade-in class will animate in when they enter the viewport
 */
function initFadeInObserver() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  // Create intersection observer with options
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation a bit before element fully enters
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        // Add .visible class to trigger animation
        entry.target.classList.add('visible');

        // Stop observing this element after it's animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  fadeElements.forEach(function(element) {
    observer.observe(element);
  });
}
