import client, { urlFor } from "../sanityClient.js";

export async function getProjects() {
  const query = `*[_type == "project"]{
    name,
    role,
    description,
    startDate,
    endDate,
    isOngoing,
    techStack,
    category->{
      name
    },
    images
  } | order(startDate desc)`;
  return await client.fetch(query);
}

export async function renderProjects() {
  const projects = await getProjects();

  const wrapper = document.querySelector(".projects .wrapper");
  const filterContainer = document.querySelector(".project-filters");

  // Collect unique categories
  const categories = [
    ...new Set(projects.map(p => p.category?.name).filter(Boolean))
  ];

  // Render filter buttons
  filterContainer.innerHTML = `
    <button class="filter-btn active" data-category="all">All</button>
    ${categories.map(cat => `<button class="filter-btn" data-category="${cat}">${cat}</button>`).join("")}
  `;

  // Render all projects by default
  renderProjectItems(projects);

  // Add filter button click listeners
  filterContainer.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
      // Update active button
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const category = e.target.dataset.category;
      const filtered = category === "all"
        ? projects
        : projects.filter(p => p.category?.name === category);

      renderProjectItems(filtered);
    }
  });
}

function renderProjectItems(projects) {
  const wrapper = document.querySelector(".projects .wrapper");
  wrapper.innerHTML = "";

  projects.forEach(project => {
    const start = new Date(project.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
    const end = project.isOngoing
      ? "Present"
      : project.endDate
        ? new Date(project.endDate).toLocaleString("en-US", { month: "short", year: "numeric" })
        : "";

    const imgUrl = project.images?.length
      ? urlFor(project.images[0]).width(600).url()
      : "assets/images/placeholder.jpg";

    const techSpans = project.techStack?.map(tech => `<span class="tech">${tech}</span>`).join("") || "";

    const descriptionList = project.description?.length
      ? `<ul class="project-description">${project.description.map(item => `<li>${item}</li>`).join("")}</ul>`
      : "";

    const projectHTML = `
      <div class="project-item">
        <img src="${imgUrl}" alt="${project.name}">
        <h2>${project.name}</h2>
        ${project.role ? `<p class="project-role">${project.role}</p>` : ""}
        <p class="project-date">${start} – ${end}</p>
        <div class="tags">
          <span class="category">${project.category?.name || "Uncategorized"}</span>
          ${techSpans}
        </div>
        ${descriptionList}
      </div>
    `;
    wrapper.insertAdjacentHTML("beforeend", projectHTML);
  });
}