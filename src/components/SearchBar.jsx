import { Search } from "lucide-react";

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className=" bg-black w-full">
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-700 bg-transparent py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-white"
      />
    </div>
    </div>
  );
}