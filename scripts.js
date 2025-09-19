let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                    .querySelector(`header nav a[href*="${id}"]`)
                    .classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

// photo
// Define the four colors to cycle through
const colors = ['#88ff00', '#ff00ff', '#00ffee', '#ff8800']; 
let colorIndex = 0; // Start at the first color

document.getElementById("themeToggle").addEventListener("click", function () {
    const root = document.documentElement;

    // Set the next color
    root.style.setProperty('--main-color', colors[colorIndex]);

    // Update the index to the next color (loop back to 0 after the last color)
    colorIndex = (colorIndex + 1) % colors.length;
});


document.querySelector('.home-img img').addEventListener('click', () => {
    const homeImg = document.querySelector('.home-img');
    const existingOrbiters = document.querySelectorAll('.orbiter');

    // If there are more than 15 orbiters, reset
    if (existingOrbiters.length >= 15) {
        existingOrbiters.forEach(orbiter => orbiter.remove());
        return;
    }

    const newOrbiter = document.createElement('div');
    newOrbiter.classList.add('orbiter');

    // Get image size
    const rect = homeImg.getBoundingClientRect();
    const imgSize = Math.max(rect.width, rect.height); 

    // Radius relative to image size (e.g., 1.5 × image width)
    const radius = imgSize * 0.7; 

    // Random angle
    const angle = Math.random() * 2 * Math.PI;

    // Cartesian coords
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const randomDirection = Math.random() > 0.5 ? 'normal' : 'reverse';

    // Pass pixels (instead of vw, since we’re based on image size)
    newOrbiter.style.setProperty('--random-x', `${x}px`);
    newOrbiter.style.setProperty('--random-y', `${y}px`);
    newOrbiter.style.animationDirection = randomDirection;

    homeImg.appendChild(newOrbiter);
});

// experience
const modal = document.getElementById("imgModal");
const closeBtn = document.getElementById("closeModal");
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const counter = document.getElementById("imageCounter");
const timeline = document.querySelector(".timeline-items"); // parent container

let currentIndex = 0;
let images = [];
let userHasInteracted = false;

function updateImage() {
  carouselImage.src = images[currentIndex];
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// Mark interaction only after first real click
window.addEventListener("click", () => {
  userHasInteracted = true;
}, { once: true });

// ✅ Event delegation: only open modal when .timeline-content is clicked
timeline.addEventListener("click", (e) => {
  const item = e.target.closest(".timeline-content");
  console.log("Timeline clicked:", item); // 🕵️ log what triggered

  if (!item) return;

  try {
    images = JSON.parse(item.getAttribute("data-images")) || [];
  } catch {
    images = [];
  }

  if (images.length > 0) {
    currentIndex = 0;
    updateImage();
    modal.style.display = "flex"; 
  }
});


prevBtn.onclick = () => {
  if (images.length > 0) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }
};

nextBtn.onclick = () => {
  if (images.length > 0) {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
