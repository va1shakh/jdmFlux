import "@google/model-viewer";
import { useState } from "react";
import { ContainerTextFlip } from "../components/text-flip";
import HomeButton from "../components/HomeButton";
import { useNavigate } from "react-router";

export function Hero({ bgColor }) {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState("mk4");
  return (
    <div>
      <div
        className={`py-4 ${bgColor} border-b-2 border-b-white/13 border-white mx-5`}
        
      >
        <select
          className="
    bg-[#000000]
    text-white
    px-4 py-3
    rounded-xl
    outline-none
    cursor-pointer
    focus:border-white/50
  "
          onChange={(e) => setSelectedCar(e.target.value)}
        >
          <option value="mk4">Supra MK4</option>
          <option value="mk5">Supra MK5</option>
          <option value="r34">Nissan Skyline r34</option>
          <option value="r34_sport">GT-R34 Sport Edition</option>
          <option value="r35">Nissan GT-R35</option>
          <option value="s15">Nissan Silvia S15</option>
        </select>
        <model-viewer
          key={selectedCar}
          src={`/models/${selectedCar}.glb`}
          camera-controls
          camera-orbit="0deg 90deg 5m"
          min-camera-orbit="auto 75deg 5m"
          max-camera-orbit="auto 75deg 5m"
          auto-rotate
          style={{ width: "100%", height: "550px" }}
          environment-image="models/studio2.hdr"
          exposure="1"
          shadow-intensity="0.8"
          shadow-softness="0.5"
        />
        {/* content */}
        <section className="pointer-events-none absolute inset-40 flex flex-col items-center gap-5">
          <div className="flex mt-3">
            <h1 className="text-5xl px-3 text-white/90 tra font-light uppercase tracking-widest py-2">
              Built for
            </h1>
            <ContainerTextFlip
              words={["Toyota", "Nissan", "Mitsubishi", "Honda"]}
            />
          </div>
          <HomeButton
            className="pointer-events-auto"
            size="xl"
            children="See more"
            onClick={() => navigate("/mods")}
          />
        </section>
      </div>
    </div>
  );
}
