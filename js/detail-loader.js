// js/detail-loader.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");
  const sub = params.get("sub");

  if (!topic || !sub || !topicData[topic] || !topicData[topic][sub]) {
    document.getElementById("subtopic-title").textContent = "Subtopic Not Found";
    document.getElementById("subtopic-description").textContent = "Please check the URL or go back.";
    return;
  }

  const subtopic = topicData[topic][sub];
  document.getElementById("subtopic-title").textContent = subtopic.title;
  document.getElementById("subtopic-description").textContent = subtopic.description;

  //debug
  console.log("topicData:", topicData);
  console.log("topic:", topic);
  console.log("sub:", sub);
  console.log("subtopic:", topicData[topic]?.[sub]);

  const resourceContainer = document.getElementById("subtopic-resources");
  resourceContainer.className = "d-flex flex-wrap gap-4 justify-content-between";

  if (subtopic.resources && subtopic.resources.length > 0) {
    subtopic.resources.forEach(res => {
      const card = document.createElement("div");
      card.className = "custom-flex-card";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${res.title}</h5>
            <p class="card-text">${res.description}</p>
            <a href="${res.link}" target="_blank" class="btn btn-outline-primary">View</a>
          </div>
        </div>
      `;
      resourceContainer.appendChild(card);
    });
  } else {
    resourceContainer.innerHTML = `<p class="text-center text-muted">No resources available yet.</p>`;
  }
});



