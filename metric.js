function animateCounter(element, targetValue, duration = 2000) {
  const startValue = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.round(
      startValue + (targetValue - startValue) * easeOut
    );

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

function startCounterAnimations() {
  const metricElements = document.querySelectorAll(".metric-title");

  metricElements.forEach((element, index) => {
    const targetValue = Number(element.textContent.replace(/[^\d.-]/g, ""));
    element.textContent = "0";

    setTimeout(() => {
      animateCounter(element, targetValue, 2000);
    }, index * 200);
  });
}

function initIntersectionObserver() {
  const section = document.querySelector("section");
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounterAnimations();
          hasAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
  );

  if (section) {
    observer.observe(section);
  }
}

// Trigger only on scroll into view
initIntersectionObserver();
