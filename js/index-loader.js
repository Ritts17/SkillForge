for (const topicKey in topicData) {
  const subtopics = topicData[topicKey];
  const container = document.getElementById(`${topicKey}-card-container`);
  if (!container) continue;

  let index = 0;
  for (const subKey in subtopics) {
    const sub = subtopics[subKey];

    // Rotate color classes
    // const colorClasses = ['bg-design', 'bg-advertising'];
    // const colorClass = colorClasses[index % colorClasses.length];

    const card = document.createElement("div");
    card.className = "custom-flex-card";
    card.innerHTML = `
      <div class="custom-block bg-white shadow-lg">
        <a href="subtopics-detail.html?topic=${topicKey}&sub=${subKey}">
          <div class="d-flex">
            <div>
              <h5 class="mb-2">${sub.title}</h5>
              <p class="mb-0">${sub.description}</p>
            </div>
          </div>
          <img src="${sub.image}" class="custom-block-image img-fluid" alt="${subKey}">
        </a>
      </div>
    `;

    container.appendChild(card);
    index++;
  }
}
