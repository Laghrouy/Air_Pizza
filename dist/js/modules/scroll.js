export const initScrollEffects = () => {
  const backToTop = document.querySelector(".back-to-top");
  const revealElements = document.querySelectorAll(".section, .pizza-card, .about__media img, .contact__map, .footer");

  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("reveal", "visible");
      } else {
        el.classList.remove("visible");
      }
    });
  };

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let isTicking = false;
  const onScroll = () => {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(() => {
      toggleBackToTop();
      revealOnScroll();
      isTicking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", () => {
    toggleBackToTop();
    revealOnScroll();
  });
};
