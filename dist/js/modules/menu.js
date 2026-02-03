export const initMenuDescriptions = () => {
  const menuDescriptions = document.querySelectorAll(".pizza-card p");
  menuDescriptions.forEach((desc) => {
    const text = desc.textContent?.trim() || "";
    desc.classList.add("pizza-card__desc");
    if (text.length < 120) return;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "pizza-card__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Lire plus";
    toggle.addEventListener("click", () => {
      const isExpanded = desc.classList.toggle("is-expanded");
      toggle.setAttribute("aria-expanded", String(isExpanded));
      toggle.textContent = isExpanded ? "Réduire" : "Lire plus";
    });
    desc.insertAdjacentElement("afterend", toggle);
  });
};
