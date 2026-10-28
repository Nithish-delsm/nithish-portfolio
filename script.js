// Portfolio behaviour: mobile menu, active nav, scroll reveal, back-to-top, form validation
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var links = document.getElementById('links');
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  // Active nav link
  var navLinks = document.querySelectorAll('.links a');
  var secs = Array.prototype.map.call(navLinks, function (a) { return document.querySelector(a.getAttribute('href')); });
  function setActive() {
    var y = window.scrollY + 120, cur = -1;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    navLinks.forEach(function (a, i) {
      a.classList.toggle('active', i === cur);
      if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  // Back to top
  var top = document.getElementById('topbtn');
  top.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 600); setActive(); }, { passive: true });
  setActive();

  // Contact form validation (browser-only; connect Formspree/Netlify to send real email)
  var form = document.getElementById('form');
  var status = document.getElementById('status');
  function check(id, test, msg) {
    var f = document.getElementById(id), err = document.getElementById('e-' + id);
    var ok = test(f.value.trim());
    f.classList.toggle('bad', !ok);
    f.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : msg;
    return ok;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var r = [
      check('name', function (v) { return v.length > 1; }, 'Enter your name.'),
      check('email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, 'Enter a valid email address.'),
      check('subject', function (v) { return v.length > 2; }, 'Enter a subject.'),
      check('message', function (v) { return v.length > 9; }, 'Write at least 10 characters.')
    ];
    if (r.indexOf(false) !== -1) { status.textContent = 'Fix the highlighted fields and send again.'; return; }
    var subject = encodeURIComponent(document.getElementById('subject').value.trim());
    var body = encodeURIComponent('Name: ' + document.getElementById('name').value.trim() + '\nEmail: ' + document.getElementById('email').value.trim() + '\n\n' + document.getElementById('message').value.trim());
    status.textContent = 'Opening your email app with the message prepared…';
    window.location.href = 'mailto:nithishh.sr5@gmail.com?subject=' + subject + '&body=' + body;
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
