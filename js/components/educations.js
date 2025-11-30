import client from "../sanityClient.js";

export async function getEducation() {
  const query = `*[_type == "education"] | order(startDate desc){
    degree,
    institution,
    major,
    startDate,
    endDate,
    gpa,
    description
  }`;
  return await client.fetch(query);
}

export async function renderEducation() {
  const educationData = await getEducation();
  const container = document.querySelector(".education-items");
  container.innerHTML = "";

  educationData.forEach(edu => {
    const start = new Date(edu.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
    const end = edu.endDate 
      ? new Date(edu.endDate).toLocaleString("en-US", { month: "short", year: "numeric" })
      : "Present";

    const eduHTML = `
      <div class="education-item">
        <div class="education-main">
          <div class="education-title">${edu.degree}, ${edu.institution}</div>
          <div class="education-date">${start} - ${end}</div>
        </div>
        <div class="education-subtitle">${edu.major}</div>
        ${edu.gpa ? `<div class="education-score">GPA: ${edu.gpa}</div>` : ""}
        <p>${edu.description || ""}</p>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", eduHTML);
  });
}
