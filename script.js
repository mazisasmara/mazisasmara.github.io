// Typing effect logic
const words = [
  "Backend Developer",
  "IoT & Robotics Enthusiast",
  "Aspiring ML Engineer"
];
let wordIndex = 0,
charIndex = words[0].length,
currentWord = words[0],
isDeleting = true;

function type() {
  currentWord = words[wordIndex];
  const typingEl = document.getElementById("typing");

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(
      0,
      charIndex - 1
    );
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(
      0,
      charIndex + 1
    );
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1500); // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50: 100);
  }
}
window.onload = type;

// Dark Mode Toggle dengan Ikon Matahari/Bulan
function toggleDark() {
  const body = document.body;
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }
}

// Intersection Observer for Reveal Animation
const revealOptions = {
  threshold: 0.15
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, revealOptions);

document
.querySelectorAll(".hidden")
.forEach(el => observer.observe(el));

// School Detail Toggle
// MODIFIED: Universal Dropdown Function
// Fungsi ini sekarang menerima ID detail dan elemen tombolnya
function toggleDropdown(detailId, element) {
  const detail = document.getElementById(detailId);
  const chevron = element.querySelector(".chevron");

  // Cek jika sudah aktif
  const isActive = detail.classList.contains("active");

  // Tutup semua dropdown lain
  document
  .querySelectorAll(".school-detail")
  .forEach(d => d.classList.remove("active"));
  document.querySelectorAll(".chevron").forEach(c => {
    c.style.transform = "rotate(0deg)";
  });

  if (isActive) {
    detail.classList.remove("active");
    chevron.style.transform = "rotate(0deg)";
  } else {
    detail.classList.add("active");
    chevron.style.transform = "rotate(180deg)";
  }
}

// Modal Logic
function openModal(text) {
  document.getElementById("modal-text").innerText = text;
  document.getElementById("modal").classList.add("active");
}
function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

// Close modal on outside click
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) closeModal();
};