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
});

function handleReg(e) {
  e.preventDefault();
  var btn = document.getElementById('regBtn');
  btn.textContent = 'Registered! See you on 16 May 2026';
  btn.style.background = '#138808';
  btn.disabled = true;
}