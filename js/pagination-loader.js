const topicsPerPage = 6;
let currentPage = 1;
let allSubtopics = [];

// Step 1: Flatten all subtopics from topicData
for (const topicKey in topicData) {
  const subtopics = topicData[topicKey];
  for (const subKey in subtopics) {
    const sub = subtopics[subKey];
    allSubtopics.push({
      topicKey,
      subKey,
      ...sub,
    });
  }
}

const totalPages = Math.ceil(allSubtopics.length / topicsPerPage);
const container = document.getElementById("pagination-card-container");
const controls = document.getElementById("pagination-controls");

function renderPage(page) {
  currentPage = page;
  container.innerHTML = "";

  const start = (page - 1) * topicsPerPage;
  const end = start + topicsPerPage;
  const pageItems = allSubtopics.slice(start, end);

  pageItems.forEach((sub, index) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-12 mb-4";
    card.innerHTML = `
      <div class="custom-block bg-white shadow-lg h-100">
        <a href="subtopics-detail.html?topic=${sub.topicKey}&sub=${sub.subKey}">
          <div class="d-flex">
            <div>
              <h5 class="mb-2">${sub.title}</h5>
              <p class="mb-0">${sub.description}</p>
            </div>
            <span class="badge bg-design rounded-pill ms-auto">${sub.badge}</span>
          </div>
          <img src="${sub.image}" class="custom-block-image img-fluid" alt="${sub.subKey}">
        </a>
      </div>
    `;
    container.appendChild(card);
  });

  renderPaginationControls();
}

function renderPaginationControls() {
  controls.innerHTML = "";

  // Previous
  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prev.addEventListener("click", () => {
    if (currentPage > 1) renderPage(currentPage - 1);
  });
  controls.appendChild(prev);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${currentPage === i ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => renderPage(i));
    controls.appendChild(li);
  }

  // Next
  const next = document.createElement("li");
  next.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  next.innerHTML = `<a class="page-link" href="#">Next</a>`;
  next.addEventListener("click", () => {
    if (currentPage < totalPages) renderPage(currentPage + 1);
  });
  controls.appendChild(next);
}

// Initial render
document.addEventListener("DOMContentLoaded", () => renderPage(1));
