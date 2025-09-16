import sanityClient from "https://cdn.skypack.dev/@sanity/client";
import imageUrlBuilder from "https://cdn.skypack.dev/@sanity/image-url";

const client = sanityClient({
  projectId: "t92g5h29", // replace
  dataset: "production",
  apiVersion: "2025-09-12", // use today's date
  useCdn: true
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
