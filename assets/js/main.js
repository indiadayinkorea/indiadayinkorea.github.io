function handleReg(e) {
  e.preventDefault();
  var btn = document.getElementById('regBtn');
  btn.textContent = 'Registered! See you on 16 May 2026';
  btn.style.background = '#138808';
  btn.disabled = true;
}