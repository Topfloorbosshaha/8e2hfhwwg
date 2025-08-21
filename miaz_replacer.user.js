// ==UserScript==
// @name         IG Local Name Replacer
// @namespace    http://local.jarvis/
// @version      1.0
// @description  Replace displayed Instagram profile name (client-side only)
// @match        https://www.instagram.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Topfloorbosshaha/8e2hfhwwg/main/miaz_replacer.user.js
// @downloadURL  https://raw.githubusercontent.com/Topfloorbosshaha/8e2hfhwwg/main/miaz_replacer.user.js
// ==/UserScript==

(function() {
  'use strict';
  const STORAGE_KEY = 'jg_desiredName_local';
  const DEFAULT_NAME = 'dead';
  // minimal local storage fallback
  const desiredName = (typeof GM_getValue === 'function') ? GM_getValue(STORAGE_KEY, DEFAULT_NAME) : DEFAULT_NAME;

  function getPathUsername() {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.length > 0 ? parts[0] : null;
  }

  function replaceProfileHeaderName(desired) {
    const pathUser = getPathUsername();
    if (!pathUser) return;
    document.querySelectorAll('h1,h2,span,div').forEach(el => {
      try {
        const t = (el.textContent || '').trim();
        if (!t) return;
        if (t.toLowerCase().includes(pathUser.toLowerCase()) || t === pathUser) {
          el.textContent = desired;
        }
      } catch(e){}
    });
  }

  const observer = new MutationObserver(()=>replaceProfileHeaderName(desiredName));
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', ()=> replaceProfileHeaderName(desiredName));
  setTimeout(()=> replaceProfileHeaderName(desiredName), 1000);
})();
