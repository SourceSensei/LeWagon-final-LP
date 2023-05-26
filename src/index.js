//Smooth scroll
$(document).ready(function () {
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").stop().animate(
        {
          scrollTop: target.offset().top,
        },
        1000
      );
    }
  });
});

//Scroll Magic & GSAP animations
let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Init controller
  controller = new ScrollMagic.Controller();
  //Select items
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const heroReveal = slide.querySelector(".reveal-hero-section");
    const revealAbout = slide.querySelector(".reveal-about-section");
    const numberCount1 = slide.querySelector("#number-span1");
    const numberCount2 = slide.querySelector("#number-span2");
    const numberCount3 = slide.querySelector("#number-span3");
    const revealBox = slide.querySelectorAll(".box-reveal");
    const revealContact = slide.querySelector(".reveal-contact-section");

    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 2, ease: "power2.inOut" },
    });
    slideTl.fromTo(
      heroReveal,
      { x: "0%", opacity: 1 },
      { x: "100%", opacity: 0.5 }
    );
    slideTl.fromTo(revealAbout, { x: "0%" }, { x: "100%" }, "-=2.5");
    slideTl.to(numberCount1, { innerText: 500 });
    slideTl.to(numberCount2, { innerText: 1000 }, "-=3");
    slideTl.to(numberCount3, { innerText: 2500 }, "-=3");
    slideTl.fromTo(revealBox, { y: "0%" }, { y: "100%" }, "-=2");
    slideTl.fromTo(
      revealContact,
      { x: "0%", opacity: 1 },
      { x: "100%", opacity: 0.75 },
      "-=5.5"
    );
    //Create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 1.2,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const burguer = document.querySelector(".burguer");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 3, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -3, background: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

burguer.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);

animateSlides();

const typed = new Typed(".hero-span-second", {
  strings: ["Source Sensei", "Web Developer", "Web Designer"],
  startDelay: 1000,
  typeSpeed: 120,
  backSpeed: 120,
  loop: true,
  showCursor: true,
});

//PopUp
const modalBtn = document.querySelector(".modal-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", () => {
  gsap.to(modalOverlay, { duration: 0.3, display: "block", opacity: 1 });
});

closeBtn.addEventListener("click", () => {
  gsap.to(modalOverlay, { duration: 0.3, display: "none", opacity: 0 });
});

//Testemonials
const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "Emily",
    position: "App Development",
    photo:
      "https://cdn.mind-diagnostics.org/uploads/mind-diagnostics/images/image/url/cro-intimacy-vs-isolation-what-they-mean-for-a-person-1-SR.jpg",
    text: "Working with Source Sensei as our app developer was an absolute pleasure. Their attention to detail and technical expertise were exceptional. They brought our app idea to life, delivering a seamless user experience and incorporating innovative features. Their communication throughout the project was top-notch, and they exceeded our expectations. I highly recommend Source Sensei for any app development needs.",
  },
  {
    name: "Benjamin",
    position: "Website Development",
    photo:
      "https://www.shouselaw.com/wp-content/uploads/2022/06/reasonable-person-standard.jpeg",
    text: "I am extremely satisfied with the website developed by Source Sensei. They took the time to understand our requirements and translated them into a visually stunning and highly functional website. Their knowledge of web development technologies and best practices was evident in the smooth navigation and responsive design. They were professional, prompt, and went above and beyond to deliver an outstanding website. I couldn't be happier with the results.",
  },
  {
    name: "Sophia",
    position: "Design",
    photo:
      "https://f.hubspotusercontent40.net/hubfs/9253440/Blog%20Images/authentic-self-person-smiling-at-camera.jpg",
    text: "Source Sensei is an exceptional designer who possesses a keen eye for aesthetics and a deep understanding of user experience. Their creativity and ability to bring concepts to life is remarkable. From the initial design mockups to the final product, [Your Name] demonstrated a remarkable attention to detail and a strong sense of visual appeal. They collaborated effectively, taking our ideas and transforming them into visually stunning designs. I highly recommend Source Sensei for anyone seeking a talented and reliable designer.",
  },
];

let idx = 1;

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  idx++;

  if (idx > testimonials.length - 1) {
    idx = 0;
  }
}

setInterval(updateTestimonial, 10000);
