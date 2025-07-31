// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")
    const navbar = document.getElementById("navbar")
  
    // Mobile menu toggle
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)"
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.boxShadow = "none"
      }
    })
  
    // Active navigation link highlighting
    const sections = document.querySelectorAll("section[id]")
  
    function highlightNavLink() {
      const scrollPos = window.scrollY + 100
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
  
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove("active"))
          if (navLink) {
            navLink.classList.add("active")
          }
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavLink)
  
    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        const targetSection = document.getElementById(targetId)
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Contact form handling
    const contactForm = document.getElementById("contact-form")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")
  
      // Simple form validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.")
        return
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }
  
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
  
      submitButton.textContent = "Sending..."
      submitButton.disabled = true
  
      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)
  
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".card, .timeline-item, .hero-content > *")
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero")
      const heroContent = document.querySelector(".hero-content")
  
      if (hero && heroContent) {
        const rate = scrolled * -0.5
        heroContent.style.transform = `translateY(${rate}px)`
      }
    })
  
    // Dynamic typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
      let i = 0
      element.innerHTML = ""
  
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i)
          i++
          setTimeout(type, speed)
        }
      }
  
      type()
    }
  
    // Add loading animation
    window.addEventListener("load", () => {
      document.body.classList.add("loaded")
  
      // Trigger hero animations
      const heroElements = document.querySelectorAll(".fade-in, .fade-in-delay, .fade-in-delay-2")
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, index * 200)
      })
    })
  
    // Add smooth hover effects for cards
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)"
      })
  
      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  
    // Add click ripple effect for buttons
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
  
        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.classList.add("ripple")
  
        this.appendChild(ripple)
  
        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  
    // Add CSS for ripple effect
    const style = document.createElement("style")
    style.textContent = `
          .btn {
              position: relative;
              overflow: hidden;
          }
          
          .ripple {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.6);
              transform: scale(0);
              animation: ripple-animation 0.6s linear;
              pointer-events: none;
          }
          
          @keyframes ripple-animation {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
          
          .loaded {
              opacity: 1;
          }
          
          body {
              opacity: 0;
              transition: opacity 0.3s ease;
          }
      `
    document.head.appendChild(style)
  })
  
  // Utility functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Performance optimization for scroll events
  const debouncedScroll = debounce(() => {
    // Scroll-based animations can be added here
  }, 10)
  
  window.addEventListener("scroll", debouncedScroll)
  