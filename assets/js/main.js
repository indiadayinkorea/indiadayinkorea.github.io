// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Initialize carousel
  initCarousel();
});

// Carousel functionality
let currentSlide = 0;
let galleyImages = [];
let autoPlayInterval;

async function loadGalleryImages() {
  try {
    // Try to load the gallery metadata
    const response = await fetch('./assets/data/gallery.json');
    if (response.ok) {
      const data = await response.json();
      galleyImages = data.images || [];
    } else {
      // Fallback: Try to autodetect images in folder
      galleyImages = await autoDetectImages();
    }
  } catch (e) {
    console.log('Gallery metadata not found, using auto-detect...');
    galleyImages = await autoDetectImages();
  }
  
  return galleyImages;
}

async function autoDetectImages() {
  // Try to detect up to 12 images by convention (img1.jpg, img2.jpg, etc.)
  const images = [];
  const basePath = '/assets/images/gallery/';
  const maxAttempts = 12;
  
  for (let i = 1; i <= maxAttempts; i++) {
    for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
      const filename = `img${i}.${ext}`;
      const fullPath = basePath + filename;
      
      // Check if image exists by attempting to load it
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = () => {
          images.push(fullPath);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = fullPath;
      });
      
      if (images.length > 0) break;
    }
  }
  
  return images.length > 0 ? images : getPlaceholderImages();
}

function getPlaceholderImages() {
  // Return placeholder images if no real images found
  return [
    '/assets/images/gallery/img1.jpg',
    '/assets/images/gallery/img2.jpg',
    '/assets/images/gallery/img3.jpg',
  ];
}

async function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!track || !dotsContainer) return;
  
  // Load gallery images
  galleyImages = await loadGalleryImages();
  
  if (galleyImages.length === 0) {
    console.warn('No gallery images found');
    return;
  }
  
  // Create carousel slides
  galleyImages.forEach((imagePath, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = `Gallery image ${index + 1}`;
    img.loading = 'lazy';
    
    slide.appendChild(img);
    track.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to image ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Attach event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => prevSlide());
  if (nextBtn) nextBtn.addEventListener('click', () => nextSlide());
  
  // Auto-play carousel
  startAutoPlay();
  
  // Pause auto-play on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
  
  if (!track) return;
  
  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;
  
  // Update active dot
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % galleyImages.length;
  updateCarousel();
  restartAutoPlay();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + galleyImages.length) % galleyImages.length;
  updateCarousel();
  restartAutoPlay();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  restartAutoPlay();
}

function startAutoPlay() {
  if (galleyImages.length <= 1) return;
  autoPlayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % galleyImages.length;
    updateCarousel();
  }, 5000); // Change image every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function restartAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function handleReg(e) {
  e.preventDefault();
  var btn = document.getElementById('regBtn');
  btn.textContent = 'Registered! See you on 16 May 2026';
  btn.style.background = '#138808';
  btn.disabled = true;
}