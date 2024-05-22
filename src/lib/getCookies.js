function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

export default getCookie