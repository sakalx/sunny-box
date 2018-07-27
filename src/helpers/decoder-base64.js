function Base64Decode(value) {
    const normalizeValue = value.split(',')[1];

  const decodedValue = decodeURIComponent(
    atob(normalizeValue)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(decodedValue);
}

export default Base64Decode;