import { loadCertifications } from "./components/certifications.js";
import { loadExperiences } from "./components/experiences.js";
import { renderProjects } from "./components/projects.js";

document.addEventListener("DOMContentLoaded", () => {
  loadExperiences();
  renderProjects();
  loadCertifications();
});