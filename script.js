document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger Animation
    burger.classList.toggle("toggle")
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active")
        burger.classList.remove("toggle")
        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Music Player Functionality
  const playBtn = document.querySelector(".play-btn")
  const playOverlay = document.querySelector(".play-overlay")
  const songItems = document.querySelectorAll(".song-item")
  const songTitle = document.querySelector(".song-title")
  const songAlbum = document.querySelector(".song-album")
  const currentTime = document.querySelector(".current-time")
  const totalTime = document.querySelector(".total-time")
  const progressBar = document.querySelector(".progress")

  // Sample song data
  const songs = [
    { title: "Annapurna Gan", album: "Premraj Adhikari", duration: "3:45" },
    { title: "Swarga Jane Bardana", album: "Premraj Adhikari", duration: "4:12" },
    { title: "Besahara", album: "Premraj Adhikari", duration: "3:58" },
    { title: "Dharti Jogau", album: "Premraj Adhikari", duration: "5:23" },
  ]

  let isPlaying = false
  let currentSongIndex = 0

  // Toggle play/pause
  function togglePlay() {
    isPlaying = !isPlaying

    if (isPlaying) {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>'
      // Simulate progress bar movement
      simulateProgress()
    } else {
      playBtn.innerHTML = '<i class="fas fa-play"></i>'
      // Stop progress simulation
      clearInterval(progressInterval)
    }
  }

  playBtn.addEventListener("click", togglePlay)
  playOverlay.addEventListener("click", togglePlay)

  // Change song when clicking on song item
  songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      songItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      item.classList.add("active")

      // Update current song
      currentSongIndex = index
      updateCurrentSong()

      // Start playing if not already
      if (!isPlaying) {
        togglePlay()
      }
    })
  })

  // Update current song display
  function updateCurrentSong() {
    const song = songs[currentSongIndex]
    songTitle.textContent = song.title
    songAlbum.textContent = song.album
    totalTime.textContent = song.duration
    currentTime.textContent = "0:00"
    progressBar.style.width = "0%"
  }

  // Simulate progress bar movement
  let progressInterval
  function simulateProgress() {
    let width = 0
    let minutes = 0
    let seconds = 0

    clearInterval(progressInterval)

    progressInterval = setInterval(() => {
      if (width >= 100) {
        clearInterval(progressInterval)
        // Move to next song
        currentSongIndex = (currentSongIndex + 1) % songs.length
        songItems.forEach((i) => i.classList.remove("active"))
        songItems[currentSongIndex].classList.add("active")
        updateCurrentSong()
        simulateProgress()
      } else {
        width += 0.5
        progressBar.style.width = width + "%"

        // Update time display
        const totalSeconds = convertTimeToSeconds(songs[currentSongIndex].duration)
        const currentSeconds = Math.floor(totalSeconds * (width / 100))

        minutes = Math.floor(currentSeconds / 60)
        seconds = currentSeconds % 60

        currentTime.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
      }
    }, 1000)
  }

  // Convert time string to seconds
  function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Next and previous buttons
  const prevBtn = document.querySelector(".fa-step-backward").parentElement
  const nextBtn = document.querySelector(".fa-step-forward").parentElement

  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
    songItems.forEach((i) => i.classList.remove("active"))
    songItems[currentSongIndex].classList.add("active")
    updateCurrentSong()

    if (isPlaying) {
      clearInterval(progressInterval)
      simulateProgress()
    }
  })

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length
    songItems.forEach((i) => i.classList.remove("active"))
    songItems[currentSongIndex].classList.add("active")
    updateCurrentSong()

    if (isPlaying) {
      clearInterval(progressInterval)
      simulateProgress()
    }
  })

  // Sticky header on scroll
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = "var(--shadow-md)"
    } else {
      header.style.boxShadow = "var(--shadow-sm)"
    }
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form form")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formValues = Object.fromEntries(formData.entries())

    // Here you would typically send the data to a server
    console.log("Form submitted with values:", formValues)

    // Reset form
    this.reset()

    // Show success message (in a real app)
    alert("Thank you for your message! I will get back to you soon.")
  })
})
