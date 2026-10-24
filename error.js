
/* ==========================================
US FOREVER - COMMON WEBSITE JAVASCRIPT
Pages: Home, Shoes, Watches, About
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

```
console.log("US FOREVER website initialized successfully.");

/* 1. FOOTER COPYRIGHT YEAR */
document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

/* 2. MOBILE NAVIGATION */
const menuToggle = document.querySelector(
    ".menu-toggle, .hamburger, .nav-toggle"
);

const navigation = document.querySelector(
    ".nav-links, .navbar-links, .navigation-links"
);

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        navigation.classList.toggle("active");
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* 3. SMOOTH SCROLL FOR SAME-PAGE LINKS */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        }
    });
});

/* 4. HANDLE IMAGE LOADING ERRORS */
document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("error", function () {
        console.warn("Image could not be loaded:", image.src);

        image.classList.add("image-error");
        image.alt = image.alt || "Image currently unavailable";
    });
});

/* 5. PREVENT EMPTY LINKS FROM JUMPING TO TOP */
document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
    });
});

/* 6. REVEAL ELEMENTS WHEN THEY ENTER THE VIEWPORT */
const revealElements = document.querySelectorAll(
    ".reveal, .fade-in, .scroll-reveal"
);

if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

/* 7. DETECT BROKEN INTERNAL PAGE LINKS */
document.querySelectorAll("a[href]").forEach(function (link) {
    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.hasAttribute("download")
    ) {
        return;
    }

    try {
        const url = new URL(href, window.location.href);

        if (
            url.origin === window.location.origin &&
            /\.(html?)$/i.test(url.pathname) &&
            !url.pathname.endsWith("/")
        ) {
            link.addEventListener("click", function () {
                console.log("Opening page:", url.pathname);
            });
        }
    } catch (error) {
        console.warn("Invalid link detected:", href);
    }
});

/* 8. ACCESSIBILITY: KEYBOARD SUPPORT FOR MENU */
if (menuToggle) {
    menuToggle.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navigation) {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.focus();
        }
    });
}
```

});

/* 9. REPORT UNHANDLED JAVASCRIPT ERRORS */
window.addEventListener("error", function (event) {
console.error(
"Website error:",
event.message,
"File:",
event.filename,
"Line:",
event.lineno
);
});

/* 10. REPORT UNHANDLED PROMISE ERRORS */
window.addEventListener("unhandledrejection", function (event) {
console.error("Unhandled asynchronous error:", event.reason);
});
