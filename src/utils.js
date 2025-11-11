export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
