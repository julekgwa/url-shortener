window.copyText = function () {
  const text = document.getElementById("url").innerHTML;
  navigator.clipboard.writeText(text);
}