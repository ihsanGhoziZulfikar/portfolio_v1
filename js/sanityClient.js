import { createClient } from "https://esm.run/@sanity/client";
import { createImageUrlBuilder } from "https://esm.run/@sanity/image-url";

const client = createClient({
  projectId: "t92g5h29",
  dataset: "production",
  apiVersion: "2025-09-12",
  useCdn: true
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
