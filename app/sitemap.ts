import type { MetadataRoute } from "next";
import facilities from "@/data/facilities.json";
import areas from "@/data/areas.json";
import type { Facility } from "@/types/facility";

const baseUrl = "https://example.com";
const facilityList = facilities as Facility[];
const areaList = areas as Array<{ slug: string }>;

export default function sitemap(): MetadataRoute.Sitemap {
  const facilityUrls = facilityList.map((facility) => ({
    url: `${baseUrl}/facilities/${facility.slug}`,
    lastModified: facility.createdAt
  }));

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/search`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/kanagawa`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/consultation`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/consultation/thanks`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    ...areaList.map((area) => ({
      url: `${baseUrl}/kanagawa/${area.slug}`,
      lastModified: new Date().toISOString()
    })),
    ...facilityUrls
  ];
}
