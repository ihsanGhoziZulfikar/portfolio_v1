import client from "../sanityClient.js";

export async function renderCertifications() {
  const data = await client.fetch(`
    *[_type == "certification"] | order(startDate desc){
      title,
      issuer,
      startDate,
      endDate,
      images[]{asset->{url}}
    }
  `);

  const container = document.querySelector(".certification-items");

  data.forEach(cert => {
    const start = new Date(cert.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
    const end = cert.endDate
      ? new Date(cert.endDate).toLocaleString("en-US", { month: "short", year: "numeric" })
      : "No Expiry";

    const images = cert.images?.map(img => img.asset.url) || [];

    const item = document.createElement("div");
    item.classList.add("certification-item");
    item.innerHTML = `
      <div class="certification-box" data-images='${JSON.stringify(images)}'>
        <div class="certification-info">
          <div class="certification-main">
            <div class="certification-title">${cert.title}</div>
            <div class="certification-date">${start} - ${end}</div>
          </div>
          <div class="certification-issuer">${cert.issuer}</div>
        </div>
      </div>
      <div class="certification-preview"></div>
    `;

    container.appendChild(item);

    // ✅ Add click logic
    const box = item.querySelector(".certification-box");
    const preview = item.querySelector(".certification-preview");

    box.addEventListener("click", () => {
      // toggle
      if (preview.style.display === "block") {
        preview.style.display = "none";
        preview.innerHTML = "";
      } else {
        preview.style.display = "block";
        preview.innerHTML = images.map(url => `<img src="${url}" alt="Certificate">`).join("");
      }
    });
  });
}
