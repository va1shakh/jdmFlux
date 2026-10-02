import "@google/model-viewer";

function Builds() {
  return (
    <div className="bg-[#2a232f] p-5 rounded-2xl mx-5">
      <model-viewer
        src="/models/mk4.glb"
        camera-controls
        camera-orbit="0deg 90deg 5m"
        min-camera-orbit="auto 75deg 5m"
        max-camera-orbit="auto 75deg 5m"
        auto-rotate
        style={{ width: "100%", height: "500px" }}
        environment-image="neutral"
        exposure="1"
        shadow-intensity="0.8"
        shadow-softness="0.5"
      />
    </div>
  );
}
export default Builds;
