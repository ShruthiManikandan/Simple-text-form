const MAX_CHARS = 200;

const textarea = document.getElementById("message");
const counter = document.getElementById("counter");
const remaining = document.getElementById("remaining");
const warning = document.getElementById("warning");
const counterRow = document.querySelector(".counter-row");

function updateCounter() {
  // Prevent exceeding the limit (also handles pasted text)
  if (textarea.value.length > MAX_CHARS) {
    textarea.value = textarea.value.slice(0, MAX_CHARS);
  }

  const typed = textarea.value.length;
  const left = MAX_CHARS - typed;

  counter.textContent = `${typed}/${MAX_CHARS} characters`;
  remaining.textContent = `${left} remaining`;

  const atLimit = typed >= MAX_CHARS;
  const nearLimit = left <= 20 && !atLimit;

  warning.hidden = !atLimit;
  textarea.classList.toggle("at-limit", atLimit);
  counterRow.classList.toggle("at-limit", atLimit);
  counterRow.classList.toggle("near-limit", nearLimit);
}

// Fires on every keystroke, paste, cut, etc.
textarea.addEventListener("input", updateCounter);

// Show the warning if the user keeps typing at the limit
textarea.addEventListener("keydown", (e) => {
  const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey;
  const hasSelection = textarea.selectionStart !== textarea.selectionEnd;
  if (isPrintable && textarea.value.length >= MAX_CHARS && !hasSelection) {
    e.preventDefault();
    warning.hidden = false;
  }
});

updateCounter();