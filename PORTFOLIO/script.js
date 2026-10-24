var SITE = {
  profile: {
    name: "John Matthew D. Delmon",
    role: "Computer Science student",               // small label above your name
    tagline: "BS Computer Science, University of Makati", // line under your name on Home
    about: "I am a student at the University of Makati, taking a Bachelor of Science in Computer Science.", // About section
    skills: ["HTML", "CSS", "Java", "JavaScript", "Python", "Git"],
    github: "https://github.com/Mateo-2",   // the GitHub button uses this link
    email: "johnmatthewdelmon485@gmail.com",
    phone: "",                              // leave "" to hide
    location: "",                           // leave "" to hide
    photo:"images/me.jpg"
  },

  
  accomplishments: [
    {
      title: "MRSP-NCR Workshop",
      desc: "Photo from the Megatronics and Robotics Society of the Philippines (NCR) workshop.",
      img: "images/mrsp-workshop.jpg",
      alt: "Group photo of workshop participants holding MRSP kits in a classroom"
    },
    {
      title: "Basic Java Programming Webinar",
      date: "August 22, 2026",
      desc: "Certificate of attendance from Project Tuklas Teknolohiya for a 3-hour Java programming webinar held on Google Meet.",
      img: "images/basic-java-webinar.png",
      fit: "contain",
      alt: "Certificate of attendance for the Basic Java Programming webinar"
    },
    {
      title: "DOST-SEI imake.wemake: Facilitator",
      date: "July 1 to 22, 2025",
      desc: "Certificate of participation as a facilitator of the school-based DOST-SEI imake.wemake Arduino-based research proposal making, at Las Piñas City National Senior High School, Talon Dos Campus.",
      img: "images/imake-wemake.jpg",
      fit: "contain",
      alt: "Certificate of participation as facilitator of DOST-SEI imake.wemake"
    },
    {
      title: "3rd Place Overall, Online Publishing (DSPC)",
      desc: "Placed 3rd overall in Online Desktop Publishing at the DSPC, and my website entry placed 5th in Web Interface.",
      img: "images/dspc-3rd-place.jpg",
      fit: "contain",
      alt: "Result poster for 3rd place in Online Desktop Publishing with the winning team photo"
    }
  ],

  
  projects: [
    {
      kind: "Website",
      title: "Ang Bagong Diwa",
      desc: "A website I created on WordPress.",
      url: "https://angbagongdiwa.wordpress.com/"
    },
    {
      kind: "Design prototype",
      title: "Figma prototype",
      desc: "An interactive prototype I designed in Figma.",
      url: "https://www.figma.com/proto/UG7khCTJHVwF1KULpzQura/Untitled?node-id=1-777&starting-point-node-id=1%3A777&t=srALZA7R3N9QtHLk-1"
    }
  ]
};


(function () {
  'use strict';

  
  var SECTIONS = [
    ['home', 'Home'],
    ['about', 'About'],
    ['accomplishments', 'Accomplishments'],
    ['projects', 'Projects'],
    ['contact', 'Contact']
  ];

  var data = SITE;
  data.profile = data.profile || {};
  data.accomplishments = data.accomplishments || [];
  data.projects = data.projects || [];
  var P = data.profile;

  var lastFocus = null;
  var app = document.getElementById('app');
  var layer = document.createElement('div');
  document.body.appendChild(layer);

  
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      }
    }
    add(e, Array.prototype.slice.call(arguments, 2));
    return e;
  }
  function add(e, kids) {
    kids.forEach(function (k) {
      if (k == null || k === false) return;
      if (Array.isArray(k)) add(e, k);
      else e.appendChild(k.nodeType ? k : document.createTextNode(String(k)));
    });
  }
  function arrow() {
    var s = document.createElement('span');
    s.setAttribute('aria-hidden', 'true');
    s.style.display = 'inline-flex';
    s.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return s;
  }
  function shortUrl(u) {
    try { var x = new URL(u); return (x.host + x.pathname).replace(/\/$/, ''); } catch (e) { return u; }
  }
  function hostOf(u) {
    try { return new URL(u).host.replace(/^www\./, ''); } catch (e) { return u; }
  }

  function closeLayer() {
    layer.replaceChildren();
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && layer.firstChild) closeLayer();
  });
  function openLightbox(a) {
    lastFocus = document.activeElement;
    var box = h('div', { class: 'overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': a.title, onclick: function (ev) { if (ev.target === box) closeLayer(); } },
      h('div', { class: 'light' },
        h('img', { src: a.img, alt: a.title }),
        h('p', {}, a.title),
        h('button', { class: 'btn sm', type: 'button', id: 'lb-close', onclick: closeLayer }, 'Close')));
    layer.replaceChildren(box);
    document.getElementById('lb-close').focus();
  }

 
  function section(id, cls, kids) {
    return h('section', { id: id, class: 'section' + (cls ? ' ' + cls : ''), 'aria-labelledby': id + '-title' },
      h('div', { class: 'wrap' }, kids));
  }
  function head(id, title, sub) {
    return h('div', { class: 'pagehead' },
      h('h2', { class: 'title', id: id + '-title' }, title),
      sub ? h('p', { class: 'sub' }, sub) : null);
  }

  function header() {
    return h('header', { class: 'bar' },
      h('div', { class: 'wrap barin' },
        h('a', { class: 'brand', href: '#home' }, P.name || ''),
        h('nav', { class: 'nav', 'aria-label': 'Sections' },
          SECTIONS.map(function (s) { return h('a', { class: 'navlink', href: '#' + s[0] }, s[1]); }))));
  }

   function homeSection() {
    var gh = P.github;
    return h('section', { id: 'home', class: 'section hero', 'aria-labelledby': 'home-title' },
      h('div', { class: 'wrap herogrid' },
       h('div', { class: 'herotext' },
        P.role ? h('p', { class: 'kicker' }, P.role) : null,
        h('h1', { id: 'home-title' }, P.name || ''),
        P.tagline ? h('p', { class: 'lead' }, P.tagline) : null,
        h('div', { class: 'actions' },
          gh ? h('a', { class: 'btn primary', href: gh, target: '_blank', rel: 'noopener noreferrer' }, 'Open my GitHub', arrow()) : null,
          h('a', { class: 'btn', href: '#projects' }, 'See projects'),
          h('a', { class: 'btn', href: '#contact' }, 'Contact me')),
        gh ? h('p', { class: 'handle' }, shortUrl(gh)) : null),
       P.photo ? h('figure', { class: 'portrait' },
        h('img', { src: P.photo, alt: 'Photo of ' + (P.name || 'me'), onerror: function (ev) {
          ev.target.replaceWith(h('div', { class: 'missing' }, 'Picture not found: ' + P.photo));
        } })) : null));
  }

  function aboutSection() {
    return section('about', 'band', [
      head('about', 'About me'),
      P.about ? h('p', { class: 'lead' }, P.about) : null,
      (P.skills && P.skills.length) ? h('div', { class: 'skillbox' },
        h('p', { class: 'label' }, 'Skills and tools'),
        h('div', { class: 'chips' }, P.skills.map(function (s) { return h('span', { class: 'chip' }, s); }))) : null
    ]);
  }

  function accCard(a) {
    return h('article', { class: 'card' },
      a.img ? h('button', { class: 'thumbbtn' + (a.fit === 'contain' ? ' contain' : ''), type: 'button', 'aria-label': 'View picture: ' + a.title, onclick: function () { openLightbox(a); } },
        h('img', { src: a.img, alt: a.alt || a.title, loading: 'lazy', onerror: function (ev) {
          var b = ev.target.closest('.thumbbtn');
          if (b) b.replaceWith(h('div', { class: 'missing' }, 'Picture not found: ' + a.img));
        } })) : null,
      h('div', { class: 'cbody' },
        h('h3', {}, a.title),
        a.date ? h('p', { class: 'date' }, a.date) : null,
        a.desc ? h('p', { class: 'desc' }, a.desc) : null));
  }
  function accSection() {
    return section('accomplishments', '', [
      head('accomplishments', 'Accomplishments', 'Workshops, certificates and awards. Tap a picture to see it larger.'),
      h('div', { class: 'grid' }, data.accomplishments.map(accCard))
    ]);
  }

  function projCard(p) {
    return h('article', { class: 'card' },
      h('div', { class: 'cbody' },
        p.kind ? h('p', { class: 'date' }, p.kind) : null,
        h('h3', {}, p.title),
        p.desc ? h('p', { class: 'desc' }, p.desc) : null),
      h('div', { class: 'ctools' },
        h('a', { class: 'btn sm primary', href: p.url, target: '_blank', rel: 'noopener noreferrer' }, 'Open project', arrow()),
        h('span', { class: 'host' }, hostOf(p.url))));
  }
  function projSection() {
    return section('projects', '', [
      head('projects', 'Projects', 'Things I have built and designed.'),
      h('div', { class: 'grid' }, data.projects.map(projCard))
    ]);
  }

  function copyBtn(text) {
    var b = h('button', { class: 'btn sm', type: 'button' }, 'Copy');
    b.addEventListener('click', function () {
      function reset(t) { b.textContent = t; setTimeout(function () { b.textContent = 'Copy'; }, 1800); }
      function fallback() {
        try {
          var val = b.closest('.row').querySelector('.value');
          var r = document.createRange(); r.selectNodeContents(val);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
          reset('Selected');
        } catch (e) { reset('Copy'); }
      }
      try { navigator.clipboard.writeText(text).then(function () { reset('Copied'); }, fallback); } catch (e) { fallback(); }
    });
    return b;
  }
  function row(label, value, acts) {
    return h('div', { class: 'row' }, h('span', { class: 'label' }, label), h('span', { class: 'value' }, value), h('span', { class: 'racts' }, acts));
  }
  function contactSection() {
    var rows = [];
    if (P.email) rows.push(row('Email', P.email, [copyBtn(P.email), h('a', { class: 'btn sm', href: 'mailto:' + P.email }, 'Open mail app')]));
    if (P.phone) rows.push(row('Phone', P.phone, [copyBtn(P.phone)]));
    if (P.location) rows.push(row('Location', P.location, []));
    if (P.github) rows.push(row('GitHub', shortUrl(P.github), [h('a', { class: 'btn sm', href: P.github, target: '_blank', rel: 'noopener noreferrer' }, 'Open', arrow())]));
    return section('contact', 'band', [
      head('contact', 'Contact', 'The best ways to reach me.'),
      h('div', { class: 'rows' }, rows)
    ]);
  }

  
  app.replaceChildren(
    header(),
    h('main', {}, homeSection(), aboutSection(), accSection(), projSection(), contactSection()),
      h('footer', { class: 'foot' }, h('div', { class: 'wrap' }, '\u00a9 ' + new Date().getFullYear() + ' ' + (P.name || '') + '. All rights reserved.'))
  );

 
  function measureBar() {
    var b = document.querySelector('.bar');
    if (b) document.documentElement.style.setProperty('--bar-h', b.offsetHeight + 'px');
  }
  measureBar();
  window.addEventListener('resize', measureBar);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureBar);

 
  var links = {};
  document.querySelectorAll('.navlink').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  function setActive(id) {
    Object.keys(links).forEach(function (k) {
      if (k === id) links[k].setAttribute('aria-current', 'location'); else links[k].removeAttribute('aria-current');
    });
  
    var nav = links[id] && links[id].parentNode;
    if (nav && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = links[id].offsetLeft - 16;
  }
  setActive('home');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    SECTIONS.forEach(function (s) { io.observe(document.getElementById(s[0])); });
  }
  window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive('contact');
  }, { passive: true });

 
  if (location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
