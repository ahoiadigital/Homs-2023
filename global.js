gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

/*******************************************************************
 * Nav Menu / desktop dropdown
 ********************************************************************/

let body = $("body");

// Full screen nav
let hamburger = $("[hamburger-button]");
let menu = $("[show-menu]");
let menuItems = $(".layout_main-nav-menu_scroll-wrap");

let hamburgerLineTop = $(".hamburger_line.is-top");
let hamburgerLineBottom = $(".hamburger_line.is-bottom");

let navTL = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: {
    duration: 0.3,
    ease: "power1.inOut"
  },
  onStart: () => {
    body.addClass("no-scroll");
  },
  onReverseComplete: () => {
    body.removeClass("no-scroll");
  }
});

let hamburgerTl = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: {
    duration: 0.2
  }
});

hamburgerTl
  .to(hamburgerLineTop, { y: 6 }, 0)
  .to(hamburgerLineBottom, { y: -5 }, 0)
  .fromTo(hamburgerLineBottom, { width: "70%" }, { width: "100%" })
  .addLabel("rotate")
  .to(hamburgerLineTop, { rotate: -45 }, "rotate")
  .to(hamburgerLineBottom, { rotate: 45 }, "rotate");

navTL
  .set(menu, { display: "flex" })
  .add(hamburgerTl.play(), 0)
  .to(menu, { y: 0 }, 0)
  .to(menuItems, { opacity: 1 }, ">");

hamburger.click(function () {
  const menuAttr = menu.attr("show-menu");

  if (menuAttr === "false") {
    navTL.play();
    menu.attr("show-menu", "true");
  } else {
    navTL.reverse();
    menu.attr("show-menu", "false");
  }
});

// FAQ accordion
const accordionButton = document.querySelectorAll(".accordion_button");

accordionButton.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.parentNode.nextElementSibling;
    const contentAttribute = content.getAttribute("show-accordion-content");
    const icon = button.getElementsByClassName(
      "icon_style_plus-line is-vertical"
    );

    if (contentAttribute === "false") {
      // Expand the content
      gsap.to(content, { height: "auto" });
      content.setAttribute("show-accordion-content", "true");
      gsap.to(icon, { opacity: 0 });
    } else {
      // Collapse the content
      gsap.to(content, { height: 0 });
      content.setAttribute("show-accordion-content", "false");
      gsap.to(icon, { opacity: 1 });
    }
  });
});

// Footer accordion
const footerAccordionButton = document.querySelectorAll(
  ".button_chevron-footer_wrap"
);

footerAccordionButton.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.parentNode.nextElementSibling;
    const contentAttribute = content.getAttribute("show-accordion-content");

    if (contentAttribute === "false") {
      // Expand the content
      gsap.to(content, { height: "auto" });
      content.setAttribute("show-accordion-content", "true");

      // rotate chevron
      gsap.to(button, { rotate: "180deg" });
    } else {
      // Collapse the content
      gsap.to(content, { height: 0 });
      content.setAttribute("show-accordion-content", "false");

      // rotate chevron
      gsap.to(button, { rotate: "0deg" });
    }
  });
});

// DESKTOP NAV
mm.add("(min-width: 768px)", () => {
  const navLogo = $("[nav-logo]");

  const sections = gsap.utils.toArray("[logo-color]");

  sections.forEach(function (section) {
    let sectionColor = $(section).attr("logo-color");

    ScrollTrigger.create({
      trigger: section,
      start: () => "top-=50 top",
      onEnter: () =>
        navLogo
          .removeClass("color-dark color-light")
          .addClass("color-" + sectionColor),
      onEnterBack: () =>
        navLogo
          .removeClass("color-dark color-light")
          .addClass("color-" + sectionColor),
      toggleActions: "restart none none reverse"
    });
  });

  let navPrimaryLogo = $("[nav-primary-logo]");
  let navSymbolLogo = $("[nav-symbol-logo]");

  ScrollTrigger.create({
    trigger: "body",
    start: "top+=100",
    onEnter: function () {
      navPrimaryLogo.addClass("hide");
      navSymbolLogo.addClass("show");
    },
    onLeaveBack: function () {
      navPrimaryLogo.removeClass("hide");
      navSymbolLogo.removeClass("show");
    }
  });
});

// Update date year in footer
document.getElementsByClassName(
  "current-year"
).innerHTML = new Date().getFullYear();
