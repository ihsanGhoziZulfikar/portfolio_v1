import client from "../sanityClient.js";

export async function renderExperiences() {
  const data = await client.fetch(`
    *[_type == "experience"] | order(startDate desc){
      company,
      role,
      startDate,
      endDate,
      description,
      images[]{asset->{url}}
    }
  `);

  const timeline = document.querySelector(".timeline-items");

  data.forEach(exp => {
    const start = new Date(exp.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
    const end = exp.endDate 
      ? new Date(exp.endDate).toLocaleString("en-US", { month: "short", year: "numeric" })
      : "Present";

    const item = document.createElement("div");
    item.classList.add("timeline-item");

    const images = exp.images?.map(i => i.asset.url) || [];

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">
        ${start} - ${end}
      </div>
      <div class="timeline-content" data-images='${JSON.stringify(images)}'>
        <h3>${exp.company}</h3>
        <h4>${exp.role}</h4>
        <ul>
          ${exp.description?.map(d => `<li>${d}</li>`).join("")}
        </ul>
      </div>
    `;
    timeline.appendChild(item);
  });
}
