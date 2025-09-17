import client from "../sanityClient.js";

export async function getResume() {
  const query = `*[_type == "resume"][0]{ file{asset->{url}} }`;
  return await client.fetch(query);
}

export async function renderResume() {
  const resumeBtn = document.getElementById("resume-btn");
  if (!resumeBtn) return;

  const resume = await getResume();
  if (resume?.file?.asset?.url) {
    resumeBtn.href = resume.file.asset.url;
  } else {
    resumeBtn.removeAttribute("href");
    resumeBtn.textContent = "Resume (Not Available)";
    resumeBtn.style.pointerEvents = "none";
  }
}
