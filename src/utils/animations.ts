
/**
 * Utility to handle scroll reveal animations
 */
export const setupScrollReveal = (): (() => void) => {
  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  elementsToReveal.forEach(element => {
    observer.observe(element);
  });
  
  // Return cleanup function
  return () => {
    elementsToReveal.forEach(element => {
      observer.unobserve(element);
    });
  };
};

/**
 * Adds staggered animation delay to a collection of elements
 */
export const addStaggeredDelay = (
  elements: NodeListOf<Element> | Element[], 
  baseDelay: number = 100
): void => {
  elements.forEach((el, index) => {
    (el as HTMLElement).style.transitionDelay = `${index * baseDelay}ms`;
  });
};

/**
 * Creates parallax effect on scroll
 */
export const setupParallax = (): (() => void) => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat((element as HTMLElement).dataset.speed || '0.2');
      const yOffset = scrollPosition * speed;
      (element as HTMLElement).style.transform = `translateY(${yOffset}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
