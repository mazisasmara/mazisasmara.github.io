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
// ===== CERTIFICATE GALLERY FILTER & MODAL =====

document.addEventListener('DOMContentLoaded', function() {
    const certDropdown = document.getElementById('cert-category');
    const certGallery = document.getElementById('cert-gallery');
    const galleryItems = document.querySelectorAll('.cert-gallery-item');

    // Filter functionality
    certDropdown.addEventListener('change', function(e) {
        const selectedCategory = e.target.value;
        
        galleryItems.forEach(item => {
            if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                item.classList.remove('hidden-item');
            } else {
                item.classList.add('hidden-item');
            }
        });
    });

    // Modal functionality - Klik gambar untuk fullscreen
    galleryItems.forEach(item => {
        const img = item.querySelector('.cert-gallery-img');
        const label = item.querySelector('.cert-label');

        item.addEventListener('click', function() {
            const modal = document.getElementById('cert-modal');
            const modalImg = document.getElementById('cert-modal-img');
            const modalLabel = document.getElementById('cert-modal-label');

            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalLabel.textContent = label.textContent;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
});

// Close modal
function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal saat klik di luar gambar
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cert-modal');
    if (e.target === modal) {
        closeCertModal();
    }
});

// Close modal dengan tombol ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});