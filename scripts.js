let fontSize = 16;
let isHighContrast = false;

function increaseFont() {
  fontSize += 2;
  document.body.style.fontSize = `${fontSize}px`;
}

function decreaseFont() {
  fontSize = Math.max(12, fontSize - 2);
  document.body.style.fontSize = `${fontSize}px`;
}

function toggleContrast() {
  isHighContrast = !isHighContrast;
  document.body.style.backgroundColor = isHighContrast ? '#000' : '#fff5f5';
  document.body.style.color = isHighContrast ? '#fff' : '#333';
  document.querySelectorAll('.content-section, .about-section, .impact-card, .ai-card, .content-card, .report-card, .domain-card').forEach(el => {
    el.style.backgroundColor = isHighContrast ? '#333' : '';
  });
}

function submitForm() {
  alert('Thank you for your message! We’ll get back to you soon.');
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.classList.toggle('active');
  });
});

// Analytics for PDF Downloads
function trackDownload(fileName) {
  const event = {
    event: 'download',
    file: fileName,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };
  console.log('Download tracked:', event);
  // For production, send to server or analytics service, e.g.:
  // fetch('/api/track', { method: 'POST', body: JSON.stringify(event) });
}

// Toggle PDF Viewer
function toggleViewer() {
  const viewer = document.querySelector('.pdf-viewer');
  const button = document.querySelector('.toggle-viewer');
  const isVisible = viewer.style.display === 'block';
  viewer.style.display = isVisible ? 'none' : 'block';
  button.textContent = isVisible ? 'Show Report Preview' : 'Hide Report Preview';
}

// Cluster Toggle for Participating Institutions
function toggleCluster(clusterId) {
  const content = document.getElementById(clusterId);
  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  content.classList.toggle('active', !isVisible);
}

document.querySelectorAll('.cluster h4').forEach(header => {
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCluster(header.getAttribute('data-cluster'));
    }
  });
});

// Interactive Chart Data
const chartData = {
  all: [1200, 800, 600, 400, 1000],
  nhcs: [500, 300, 200, 150, 400],
  sgh: [400, 250, 180, 120, 350],
  cgh: [100, 80, 60, 40, 90],
  skh: [80, 60, 50, 30, 70],
  nuhcs: [200, 150, 100, 80, 180],
  ntfgh: [70, 50, 40, 20, 60],
  ah: [50, 40, 30, 20, 45],
  ttsh: [300, 200, 150, 100, 250],
  ktph: [90, 70, 50, 30, 80],
  wh: [60, 50, 40, 20, 55]
};

function updateChart() {
  const filter = document.getElementById('data-filter')?.value || 'all';
  const ctx = document.getElementById('data-chart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Heart Stents', 'Bypass Surgery', 'Electrophysiology', 'Pacemakers', 'Heart Failure'],
        datasets: [{
          label: 'Treatments (2024)',
          data: chartData[filter],
          backgroundColor: '#ff4d4d',
          borderColor: '#004aad',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('data-chart')) {
    updateChart();
  }
});



