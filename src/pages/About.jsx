"use client";
import { Globe3D } from "../components/Globe3D";

const sampleMarkers = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

function About() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:gap-12 lg:gap-16 lg:px-8">
      {/* ABOUT SECTION */}
      <div className="w-full min-w-0 md:flex-1">
        <h2 className="mb-5 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl lg:text-5xl">
          About Us!
        </h2>

        <p className="max-w-xl leading-7 text-neutral-600 dark:text-neutral-400">
          JDM FLUX is a platform built for enthusiasts who share a passion for
          Japanese cars and automotive culture. Explore iconic JDM cars,
          discover modification parts, and find inspiration for your next build.
        </p>
      </div>

      {/* GLOBE CARD */}
      <div className="relative isolate h-[360px] w-full min-w-0 max-w-lg shrink-0 overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/10 sm:h-[400px] sm:p-8 md:h-[380px] md:flex-1 lg:h-[420px] dark:bg-neutral-900">
        <h2 className="relative z-10 mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
          The World Runs on JDM
        </h2>

        <p className="relative z-10 max-w-lg text-balance leading-6 text-neutral-600 dark:text-neutral-400">
          JDM FLUX connects enthusiasts united by a passion for Japanese cars,
          builds, and the culture behind them.
        </p>

        <Globe3D
          className="pointer-events-auto absolute -bottom-[300px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 sm:-bottom-[320px] sm:h-[700px] sm:w-[700px] md:-bottom-[300px] lg:-bottom-[330px]"
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#4da6ff",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
          }}
          onMarkerClick={(marker) => {
            console.log("Clicked marker:", marker.label);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              console.log("Hovering:", marker.label);
            }
          }}
        />
      </div>
    </div>
  );
}
export default About;
