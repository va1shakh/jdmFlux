import { Link } from "react-router";

function EmptyState({ icon, name }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      {" "}
      <div className="flex flex-col items-center text-center">
        {" "}
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          {" "}
          <span className="text-4xl text-zinc-500">{icon}</span>{" "}
        </div>{" "}
        <h2 className="text-2xl font-semibold text-white">
          {" "}
          Your {name} is empty{" "}
        </h2>{" "}
        <p className="mt-2 max-w-sm text-zinc-500">
          {" "}
          Add your favorite JDM modification parts and they’ll appear here.{" "}
        </p>{" "}
        <button className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200">
          {" "}
          <Link to="/mods">Browse Mods</Link>{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
export default EmptyState;
