import bg from "../assets/bg.mp4";
import buildImg from "../assets/build.jpg";
import { ContainerTextFlip } from "../components/text-flip";
import EchoText from "../components/EchoText";
import HomeButton from "../components/HomeButton";
function Home() {
  return (
    <main className="bg-black flex flex-col">
      {/* main highlight */}
      <section className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={bg} type="video/mp4" />
        </video>
      </section>

      {/* car highlight */}
      <section className="h-screen bg-black text-white flex flex-col items-center gap-5">
        <hr className="w-full" />
        <div className="flex mt-3">
          <h1 className="text-5xl px-3 font-normal py-2">Built for</h1>
          <ContainerTextFlip
            words={["Toyota", "Nissan", "Mitsubishi", "Honda"]}
          />
        </div>
        <HomeButton size="xl" children="See more" />
        <hr className="w-full my-4" />
      </section>

      {/* mods highlight */}
      <section className="h-screen bg-black text-white">
        <h2 className="text-6xl">Mods</h2>
      </section>

      {/* build highlight */}
      <section className=" bg-black text-white relative">
        <img src={buildImg} alt="buildImg" className=" w-full object-cover" />
        <div className="absolute inset-0 bg-black/90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-10">
          <EchoText text="Japanese blood" color="#260300" tint="#260300" />
          <HomeButton size="xl" children="See builds" />
        </div>
      </section>
    </main>
  );
}
export default Home;
