import { Search } from "lucide-react";

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className=" bg-white/13 rounded-xl w-94">
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 rounded-xl pl-10 pr-3 text-sm text-white/90 outline-none focus:border-white"
      />
    </div>
    </div>
  );
}