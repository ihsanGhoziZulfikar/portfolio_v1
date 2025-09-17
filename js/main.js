import { renderCertifications } from "./components/certifications.js";
import { renderEducation } from "./components/educations.js";
import { renderExperiences } from "./components/experiences.js";
import { renderProjects } from "./components/projects.js";
import { renderResume } from "./components/resume.js";

document.addEventListener("DOMContentLoaded", () => {
  renderExperiences();
  renderProjects();
  renderCertifications();
  renderResume();
  renderEducation();
});