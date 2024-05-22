// lib/removeCookies.js
function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
}

export default removeCookie;
