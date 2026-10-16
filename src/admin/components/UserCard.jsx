import { Ban, ShieldCheck, Trash2 } from "lucide-react";
import { useBlockUser } from "../hooks/useBlockUser";
import { clsx } from "clsx";
import { useDltUser } from "../hooks/useDltUser";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        status === "blocked"
          ? "bg-red-50 text-red-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "blocked" ? "bg-red-500" : "bg-emerald-500"
        }`}
      />
      {status === "blocked" ? "Blocked" : "Active"}
    </span>
  );
}

export function UserCard({ user }) {
  const id = user.id;
  const handleBlock = useBlockUser();
  const handleDltUser = useDltUser();

  return (
    <article className="rounded-3xl drop-shadow-lg border border-gray-300 bg-[#ffffff] p-4 transition">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#246dff] text-slate-500">
          <span className="text-white/90">
            {user?.username?.[0]?.toUpperCase()}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {user.username}
          </h3>
          <p className="mt-1 break-all text-sm text-black/80">{user.email}</p>
          <p className="mt-1 text-xs text-black/80">ID: {id}</p>
          <p className="mt-1 text-xs text-black/80">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <StatusBadge status={user.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() =>
            handleBlock({
              id,
              status: user.status === "blocked" ? "active" : "blocked",
            })
          }
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-lg border  px-3 py-2 text-xs font-medium transition cursor-pointer",
            user.status === "active"
              ? "hover:bg-red-200/40 border-red-700 text-red-700"
              : "hover:bg-green-200/40 border-green-700 text-green-700",
          )}
        >
          {user.status === "blocked" ? (
            <ShieldCheck size={14} />
          ) : (
            <Ban size={14} />
          )}
          {user.status === "blocked" ? "Unblock" : "Block"}
        </button>

        <button
          type="button"
          onClick={() => handleDltUser(id)}
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition hover:bg-red-200/40 border-red-700 text-red-700 cursor-pointer"
        >
          <Trash2 size={14} />
          Delete account
        </button>
      </div>
    </article>
  );
}
