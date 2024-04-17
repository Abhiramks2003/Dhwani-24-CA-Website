import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "39xsv51w",
  dataset: "original",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-03-02", // use current date (YYYY-MM-DD) to target the latest API version
});
