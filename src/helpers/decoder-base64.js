function Base64Decode(key) {
  const value = localStorage.getItem(key).split(',')[1];

  const decodedValue = decodeURIComponent(
    atob(value)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(decodedValue);
}

export default Base64Decode;