export default function initScrollReveal(targetElements, defaultProps) {
  if (!targetElements.length) return;

  // Performance optimization: Use requestIdleCallback if available
  const initializeScrollReveal = () => {
    ScrollReveal({
      reset: false,
      useDelay: "once",
      mobile: false, // Disable on mobile for better performance
      delay: 0, // Reduce delay
      easing: "ease-in-out",
    });

    targetElements.forEach(({ element, animation }) => {
      ScrollReveal().reveal(
        element,
        Object.assign({}, defaultProps, animation)
      );
    });
  };

  // Use requestIdleCallback for non-critical initialization
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initializeScrollReveal);
  } else {
    // Fallback to setTimeout for browsers that don't support requestIdleCallback
    setTimeout(initializeScrollReveal, 200);
  }
}
