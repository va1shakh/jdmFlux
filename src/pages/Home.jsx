import bg from '../assets/bg.mp4'
function Home() {
  return (
    <main>
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

      {/* Cars Highlight */}
      <section className="h-screen bg-black text-white">
        <h2 className="text-6xl">Cars</h2>
      </section>

      {/* Mods Highlight */}
      <section className="h-screen bg-black text-white">
        <h2 className="text-6xl">Mods</h2>
      </section>

      {/* Builds Highlight */}
      <section className="h-screen bg-black text-white">
        <h2 className="text-6xl">Builds</h2>
      </section>
    </main>
  );
}
export default Home;
