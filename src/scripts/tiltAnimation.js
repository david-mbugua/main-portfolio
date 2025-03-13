import VanillaTilt from "vanilla-tilt";

export default function initTiltAnimation() {
  const elements = document.querySelectorAll(".js-tilt");

  // Only initialize tilt on larger screens for better performance
  if (window.innerWidth > 768) {
    VanillaTilt.init(elements, {
      max: 4,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
      gyroscope: false, // Disable gyroscope for better performance
      scale: 1.02, // Reduce scale amount
      perspective: 1000, // Higher perspective for less intensive effect
      transition: true, // Enable smooth transitions
      easing: "cubic-bezier(.03,.98,.52,.99)", // Smoother easing function
    });
  }
}
