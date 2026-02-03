export const initOrderButtonPulse = () => {
  const orderButtons = document.querySelectorAll(".location-inline.btn--primary");
  orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.remove("is-pressed");
      window.requestAnimationFrame(() => {
        button.classList.add("is-pressed");
      });
    });
    button.addEventListener("animationend", () => {
      button.classList.remove("is-pressed");
    });
  });
};
