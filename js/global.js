/* ============================================
   CENTURY CLEAN GROUP — UI/UX Pro Max JavaScript
   Premium Animations · Scroll Reveal · Parallax · Loader
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ==========================================
  // LOADER — Cinematic reveal (Apple/Stripe style)
  // Logo centered for ~2.5s, then smooth exit
  // ==========================================
  var loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    var loaderMinTime = 2500; // 2.5 seconds minimum display
    var loaderStart = Date.now();

    function hideLoader() {
      var elapsed = Date.now() - loaderStart;
      var remaining = Math.max(0, loaderMinTime - elapsed);
      setTimeout(function() {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(function() {
          loader.style.display = 'none';
        }, 800);
      }, remaining);
    }

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
    // Fallback: hide after 5s even if load event doesn't fire
    setTimeout(function() {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(function() {
          loader.style.display = 'none';
        }, 800);
      }
    }, 5000);
  }

  // ==========================================
  // NAVIGATION SCROLL — Blur backdrop
  // ==========================================
  var nav = document.getElementById('nav');
  if (nav) {
    var lastScrollY = 0;
    window.addEventListener('scroll', function() {
      var scrollY = window.pageYOffset;
      if (scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScrollY = scrollY;
    });
  }

  // ==========================================
  // MOBILE MENU
  // ==========================================
  var mobileMenu = document.getElementById('mobileMenu');
  var menuToggle = document.getElementById('menuToggle');
  var menuClose = document.getElementById('menuClose');

  window.toggleMobileMenu = function() {
    if (mobileMenu) {
      var isActive = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = isActive ? '' : 'hidden';
    }
  };

  window.closeMobileMenu = function() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================
  // COUNTER ANIMATION — Smooth number count-up
  // ==========================================
  function animateCounter(el, target, duration) {
    var suffix = el.getAttribute('data-suffix') || '';
    var startTime = performance.now();

    function update(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);

      if (suffix === '%') {
        el.textContent = current + suffix;
      } else if (suffix === '+') {
        el.textContent = current.toLocaleString() + suffix;
      } else if (suffix === '/7') {
        el.textContent = current + suffix;
      } else {
        el.textContent = current.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Final value
        if (suffix === '%') {
          el.textContent = target + suffix;
        } else if (suffix === '+') {
          el.textContent = target.toLocaleString() + suffix;
        } else if (suffix === '/7') {
          el.textContent = target + suffix;
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    }
    requestAnimationFrame(update);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var target = parseInt(entry.target.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
          animateCounter(entry.target, target, 2000);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-number[data-target]').forEach(function(el) {
    counterObserver.observe(el);
  });

  // ==========================================
  // SCROLL REVEAL — Fade up, left, right, scale
  // ==========================================
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ==========================================
  // TESTIMONIAL CAROUSEL — Auto-scroll with drag
  // ==========================================
  var testimonialTrack = document.getElementById('testimonialTrack');
  if (testimonialTrack) {
    var scrollAmount = 0;
    var speed = 0.5;
    var isHovering = false;

    testimonialTrack.addEventListener('mouseenter', function() { isHovering = true; });
    testimonialTrack.addEventListener('mouseleave', function() { isHovering = false; });

    var isDragging = false;
    var startX = 0;
    var dragOffset = 0;

    testimonialTrack.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.pageX;
      testimonialTrack.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      dragOffset = e.pageX - startX;
      testimonialTrack.style.transform = 'translateX(-' + (scrollAmount - dragOffset) + 'px)';
    });

    window.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      var maxScroll = testimonialTrack.scrollWidth - window.innerWidth;
      scrollAmount = Math.max(0, Math.min(scrollAmount - dragOffset, maxScroll));
      testimonialTrack.style.cursor = 'grab';
    });

    // Touch support
    testimonialTrack.addEventListener('touchstart', function(e) {
      isDragging = true;
      startX = e.touches[0].pageX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      dragOffset = e.touches[0].pageX - startX;
      testimonialTrack.style.transform = 'translateX(-' + (scrollAmount - dragOffset) + 'px)';
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', function() {
      if (!isDragging) return;
      isDragging = false;
      var maxScroll = testimonialTrack.scrollWidth - window.innerWidth;
      scrollAmount = Math.max(0, Math.min(scrollAmount - dragOffset, maxScroll));
    });

    function autoScroll() {
      if (!isHovering && !isDragging) {
        scrollAmount += speed;
        var maxScroll = testimonialTrack.scrollWidth - window.innerWidth;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        }
        testimonialTrack.style.transform = 'translateX(-' + scrollAmount + 'px)';
      }
      requestAnimationFrame(autoScroll);
    }
    setTimeout(autoScroll, 3000);
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      var item = this.parentElement;
      var isActive = item.classList.contains('active');

      // Close other items
      document.querySelectorAll('.faq-item.active').forEach(function(other) {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      item.classList.toggle('active', !isActive);
    });
  });

  // ==========================================
  // SMOOTH ANCHOR SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // PORTFOLIO FILTER — Animated transitions
  // ==========================================
  var portfolioFilters = document.getElementById('portfolioFilters');
  var portfolioGrid = document.getElementById('portfolioGrid');
  var portfolioEmpty = document.getElementById('portfolioEmpty');

  if (portfolioFilters && portfolioGrid) {
    var portfolioChips = portfolioFilters.querySelectorAll('.filter-chip');
    var portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
    var filterAnimating = false;

    portfolioChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        if (filterAnimating) return;
        filterAnimating = true;

        portfolioChips.forEach(function(c) { c.classList.remove('active'); });
        chip.classList.add('active');

        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;
        var staggerDelay = 0;

        portfolioItems.forEach(function(item) {
          var category = item.getAttribute('data-category');
          var shouldShow = filter === 'all' || category === filter;

          if (!shouldShow) {
            item.classList.add('hidden-item');
            item.classList.remove('showing-item');
          }
        });

        setTimeout(function() {
          portfolioItems.forEach(function(item) {
            var category = item.getAttribute('data-category');
            var shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
              item.classList.remove('hidden-item');
              item.style.transitionDelay = staggerDelay + 'ms';
              item.classList.add('showing-item');
              staggerDelay += 60;
              visibleCount++;
            }
          });

          if (portfolioEmpty) {
            portfolioEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
          }

          setTimeout(function() {
            portfolioItems.forEach(function(item) {
              item.style.transitionDelay = '0ms';
            });
            filterAnimating = false;
          }, staggerDelay + 400);
        }, 200);
      });
    });
  }

  // ==========================================
  // BEFORE/AFTER SLIDER
  // ==========================================
  document.querySelectorAll('.before-after-container').forEach(function(container) {
    var handle = container.querySelector('.slider-handle');
    var beforeImg = container.querySelector('.image-before');
    var afterImg = container.querySelector('.image-after');
    if (!handle || !afterImg) return;

    var isResizing = false;

    function setSlider(pageX) {
      var rect = container.getBoundingClientRect();
      var pos = ((pageX - rect.left) / rect.width) * 100;
      if (pos < 3) pos = 3;
      if (pos > 97) pos = 97;
      handle.style.left = pos + '%';
      if (beforeImg) beforeImg.style.width = pos + '%';
      afterImg.style.clipPath = 'inset(0 0 0 ' + pos + '%)';
    }

    handle.addEventListener('mousedown', function(e) { isResizing = true; e.preventDefault(); });
    window.addEventListener('mouseup', function() { isResizing = false; });
    window.addEventListener('mousemove', function(e) { if (isResizing) setSlider(e.pageX); });

    handle.addEventListener('touchstart', function() { isResizing = true; }, { passive: true });
    window.addEventListener('touchend', function() { isResizing = false; });
    window.addEventListener('touchmove', function(e) { if (isResizing) setSlider(e.touches[0].pageX); }, { passive: true });
  });

  // ==========================================
  // FORM HANDLING
  // ==========================================
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var origHTML = btn.innerHTML;

      btn.innerHTML = 'Enviando...';
      btn.style.pointerEvents = 'none';

      setTimeout(function() {
        btn.innerHTML = '¡Enviado! ✓';
        btn.style.background = 'var(--accent-gradient)';
        quoteForm.reset();

        setTimeout(function() {
          btn.innerHTML = origHTML;
          btn.style.pointerEvents = '';
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // ==========================================
  // HERO SCROLL EFFECTS — Parallax + fade
  // ==========================================
  var heroParallaxLayers = document.querySelectorAll('.hero-parallax-layer');
  var heroEl = document.getElementById('hero');
  var heroContent = document.querySelector('.hero-content');
  var ticking = false;
  var heroPastView = false;

  function updateHeroScroll() {
    var scrollY = window.pageYOffset;
    var vh = window.innerHeight;

    if (!heroPastView && heroEl && scrollY < vh * 1.2) {
      heroParallaxLayers.forEach(function(layer) {
        var speed = parseFloat(layer.getAttribute('data-speed')) || 0.05;
        layer.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }

    if (heroContent && scrollY < vh) {
      var progress = Math.min(scrollY / (vh * 0.7), 1);
      heroContent.style.opacity = (1 - progress).toFixed(3);
      heroContent.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
    }

    if (!heroPastView && scrollY > vh * 1.2) {
      heroPastView = true;
      heroParallaxLayers.forEach(function(layer) {
        layer.style.willChange = 'auto';
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeroScroll);
      ticking = true;
    }
  });

  // ==========================================
  // TYPING ANIMATION — Rotating phrases
  // ==========================================
  var typingTarget = document.getElementById('typingTarget');
  var typingCursor = document.getElementById('typingCursor');
  if (typingTarget && typingCursor) {
    var phrases = [
      'Cada espacio tratado con la precisión de un hotel cinco estrellas.',
      'Preservamos el valor de su inversión inmobiliaria.',
      'Estándares de clase mundial en cada detalle.',
      'Atención premium para propiedades excepcionales.'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 35;
    var deleteSpeed = 20;
    var pauseEnd = 2400;
    var pauseStart = 400;

    function typeEffect() {
      var currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          setTimeout(function() {
            isDeleting = true;
            typeEffect();
          }, pauseEnd);
          return;
        }
        setTimeout(typeEffect, typeSpeed + Math.random() * 30);
      } else {
        typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeEffect, pauseStart);
          return;
        }
        setTimeout(typeEffect, deleteSpeed);
      }
    }

    setTimeout(typeEffect, 2500);
  }

  // ==========================================
  // MORPH TEXT — Word cycling in hero
  // ==========================================
  var morphWord = document.getElementById('heroMorphWord');
  if (morphWord) {
    var morphWords = ['nuestra.', 'excellencia.', 'perfección.', 'clase mundial.', 'lujo.'];
    var morphIndex = 0;

    setInterval(function() {
      morphIndex = (morphIndex + 1) % morphWords.length;
      morphWord.classList.add('morphing');

      setTimeout(function() {
        morphWord.textContent = morphWords[morphIndex];
        morphWord.classList.remove('morphing');
      }, 400);
    }, 3200);
  }

  // ==========================================
  // MAGNETIC BUTTON HOVER
  // ==========================================
  document.querySelectorAll('.magnetic-wrap').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ==========================================
  // IMAGE REVEAL ON SCROLL
  // ==========================================
  var imgRevealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imgRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.img-reveal').forEach(function(img) {
    imgRevealObserver.observe(img);
  });

  // ==========================================
  // LINE DRAW ON SCROLL
  // ==========================================
  var lineDrawObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        lineDrawObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.line-draw').forEach(function(el) {
    lineDrawObserver.observe(el);
  });

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ==========================================
  var currentPage = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function(link) {
    if (link.getAttribute('href') && currentPage.includes(link.getAttribute('href').replace('pages/', '').replace('/', ''))) {
      link.classList.add('active');
    }
  });

  // Console branding
  console.log('%c CCG ', 'background:linear-gradient(135deg,#00B4D8,#0EA5E9);color:#fff;font-size:13px;font-weight:600;padding:4px 10px;border-radius:6px;font-family:system-ui;');
});
