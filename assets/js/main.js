/* ============================================================
   Tweety portfolio — interactions
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Gallery data (real app screens) ---------- */
  var SHOTS = [
    { src: 'onboarding',        cat: 'onboarding', title: 'Onboarding',        desc: 'Intro carousel' },
    { src: 'auth-register',     cat: 'onboarding', title: 'Register',          desc: 'Create account' },
    { src: 'auth-login',        cat: 'onboarding', title: 'Login',             desc: 'Email & password' },
    { src: 'auth-email-verify', cat: 'onboarding', title: 'Email verification', desc: 'Verify your email' },
    { src: 'feed',              cat: 'feed',       title: 'News Feed',         desc: 'Light & dark' },
    { src: 'feed-comment',      cat: 'feed',       title: 'Add Comment',       desc: 'Comment dialog' },
    { src: 'feed-delete',       cat: 'feed',       title: 'Delete Post',       desc: 'Owner-only action' },
    { src: 'post-detail',       cat: 'feed',       title: 'Post & Media',      desc: 'Image post' },
    { src: 'chats-light',       cat: 'chat',       title: 'Chats',             desc: 'Real-time · light' },
    { src: 'chats-dark',        cat: 'chat',       title: 'Chats',             desc: 'Real-time · dark' },
    { src: 'users-light',       cat: 'profile',    title: 'Users',             desc: 'People directory' },
    { src: 'users-dark',        cat: 'profile',    title: 'Users',             desc: 'Directory · dark' },
    { src: 'search',            cat: 'profile',    title: 'Search',            desc: 'Find people' },
    { src: 'profile',           cat: 'profile',    title: 'Profile',           desc: 'Avatar, cover & bio' },
    { src: 'notification',      cat: 'system',     title: 'Notifications',     desc: 'Push alert' },
    { src: 'connectivity',      cat: 'system',     title: 'Offline screen',    desc: 'No-internet state' }
  ];

  var gallery = document.getElementById('gallery');
  var frag = document.createDocumentFragment();
  SHOTS.forEach(function (s, i) {
    var el = document.createElement('div');
    el.className = 'shot';
    el.setAttribute('data-cat', s.cat);
    el.setAttribute('data-index', i);
    el.innerHTML =
      '<img src="assets/screens/' + s.src + '.jpg" alt="Tweety — ' + s.title + '" loading="lazy" />' +
      '<div class="caption"><b>' + s.title + '</b><span>' + s.desc + '</span></div>';
    frag.appendChild(el);
  });
  gallery.appendChild(frag);

  /* ---------- Filtering ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      document.querySelectorAll('.shot').forEach(function (shot) {
        var show = f === 'all' || shot.getAttribute('data-cat') === f;
        shot.classList.toggle('hide', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var current = 0;

  function visibleShots() {
    return Array.prototype.filter.call(document.querySelectorAll('.shot'), function (s) {
      return !s.classList.contains('hide');
    });
  }
  function openLb(shotEl) {
    var vis = visibleShots();
    current = vis.indexOf(shotEl);
    renderLb(vis);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function renderLb(vis) {
    if (!vis.length) return;
    if (current < 0) current = vis.length - 1;
    if (current >= vis.length) current = 0;
    var idx = parseInt(vis[current].getAttribute('data-index'), 10);
    var s = SHOTS[idx];
    lbImg.src = 'assets/screens/' + s.src + '.jpg';
    lbImg.alt = 'Tweety — ' + s.title;
    lbCap.textContent = s.title + ' — ' + s.desc;
  }
  function step(dir) { var vis = visibleShots(); current += dir; renderLb(vis); }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  gallery.addEventListener('click', function (e) {
    var shot = e.target.closest('.shot');
    if (shot) openLb(shot);
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });

  /* ---------- Nav: scroll state + mobile menu ---------- */
  var nav = document.getElementById('nav');
  var mobileMenu = document.getElementById('mobileMenu');
  var navToggle = document.getElementById('navToggle');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
  navToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  });

  /* ---------- Tech stack tabs ---------- */
  document.querySelectorAll('.stack-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stack-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.stack-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var key = tab.getAttribute('data-stack');
      var panel = document.querySelector('.stack-panel[data-panel="' + key + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        var a = item.querySelector('.faq-a');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (r) { r.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCount);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Footer year ---------- */
  // (kept static 2026 in markup for reproducibility)
})();
