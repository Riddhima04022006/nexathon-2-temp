import appwriteLogo from "../app/(main)/flashback/src/assets/appwrite.svg";
import codecrafterLogo from "../app/(main)/flashback/src/assets/codecrafter.webp";
import fftLogo from "../app/(main)/flashback/src/assets/fft.png";
import fxHeaderLogo from "../app/(main)/flashback/src/assets/fx-header.png";
import sprintLogo from "../app/(main)/flashback/src/assets/sprintlogo.png";
import xyzLogo from "../app/(main)/flashback/src/assets/xyz.svg";

export const CompanyArchive = () => {
  const companies = [
    {
      id: 1,
      name: ".xyz",
      logoUrl: xyzLogo.src || xyzLogo,
    },
    {
      id: 2,
      name: "Appwrite",
      logoUrl: appwriteLogo.src || appwriteLogo,
    },
    {
      id: 3,
      name: "CodeCrafter",
      logoUrl: codecrafterLogo.src || codecrafterLogo,
    },
    {
      id: 4,
      name: "FFT",
      logoUrl: fftLogo.src || fftLogo,
    },
    {
      id: 5,
      name: "FX Header",
      logoUrl: fxHeaderLogo.src || fxHeaderLogo,
    },
    {
      id: 6,
      name: "Sprint",
      logoUrl: sprintLogo.src || sprintLogo,
    },
  ];
  return companies;
};