// ░░░ Меню ░░░
const menuBtn = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
};
overlay.onclick = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
};

// ░░░ Смена темы ░░░
document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("dark");

// ░░░ Accordion ░░░
document.querySelectorAll(".acc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.nextElementSibling.style.display =
            btn.nextElementSibling.style.display === "block"
                ? "none"
                : "block";
    });
});

// ░░░ Inline-help ░░░
document.querySelectorAll(".help").forEach(el => {
    el.addEventListener("click", () => {
        if (el.nextElementSibling && el.nextElementSibling.classList.contains("help-text")) {
            el.nextElementSibling.remove();
        } else {
            const div = document.createElement("div");
            div.className = "help-text";
            div.textContent = el.dataset.help;
            el.insertAdjacentElement("afterend", div);
        }
    });
});
