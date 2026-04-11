import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.nexathonv2.in/",
    },
    {
      url: "https://www.nexathonv2.in/about",
    },
    {
      url: "https://www.nexathonv2.in/contact",
    },
  ];
}