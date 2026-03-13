/**
 * banner.js - Controls the newspaper banner overlay on the Next To Eat homepage
 */
(function() {
  const NOW_OPEN = true;
  const BANNER_DISMISSED_KEY = 'yam-banner-dismissed';

  document.addEventListener('DOMContentLoaded', function() {
    initBanner();
  });

  function initBanner() {
    var overlay = document.getElementById('yam-overlay');
    if (!overlay) return;

    // Check if previously dismissed
    if (localStorage.getItem(BANNER_DISMISSED_KEY) === 'true') {
      overlay.remove();
      return;
    }

    // Show overlay, lock body scroll
    document.body.style.overflow = 'hidden';

    // Start entrance animation
    var newspaper = overlay.querySelector('.banner-newspaper');
    if (newspaper) {
      newspaper.classList.add('banner-enter');
      newspaper.addEventListener('animationend', function handler() {
        newspaper.classList.remove('banner-enter');
        newspaper.classList.add('banner-bounce');
        // Show dismiss button after animation
        var dismissBtn = overlay.querySelector('.banner-dismiss');
        if (dismissBtn) dismissBtn.classList.add('visible');
        newspaper.removeEventListener('animationend', handler);
      });
    }

    // Date banner: show NOW OPEN or COMING SOON
    var comingSoon = document.getElementById('coming-soon');
    var nowOpen = document.getElementById('now-open');
    if (NOW_OPEN) {
      if (comingSoon) comingSoon.style.display = 'none';
      if (nowOpen) { nowOpen.style.display = 'flex'; nowOpen.classList.add('revealed'); }
    } else {
      if (nowOpen) nowOpen.style.display = 'none';
      if (comingSoon) comingSoon.style.display = 'flex';
    }

    // Logo fallback
    var logoImg = document.getElementById('yam-logo-img');
    var logoFallback = document.getElementById('yam-logo-fallback');
    if (logoImg) {
      logoImg.addEventListener('error', function() {
        logoImg.style.display = 'none';
        if (logoFallback) logoFallback.style.display = 'flex';
      });
    }

    // Dismiss button
    var dismissBtn = overlay.querySelector('.banner-dismiss');
    var dismissCheckbox = document.getElementById('yam-dismiss-forever');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function() {
        if (dismissCheckbox && dismissCheckbox.checked) {
          localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
        }
        // Exit animation
        if (newspaper) {
          newspaper.classList.remove('banner-bounce');
          newspaper.classList.add('banner-exit');
        }
        var backdrop = overlay.querySelector('.banner-backdrop');
        if (backdrop) backdrop.classList.add('banner-exit');

        setTimeout(function() {
          overlay.remove();
          document.body.style.overflow = '';
        }, 700);
      });
    }
  }
})();
