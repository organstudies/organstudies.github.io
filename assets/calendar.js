document.addEventListener("DOMContentLoaded", () => {
  console.log("calendar js loaded");

  document.querySelectorAll("[data-test]").forEach(el => {
    el.addEventListener("click", () => {
      alert("clicked: " + el.dataset.test);
    });
  });
});
