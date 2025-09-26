"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Search } from "lucide-react";
import Tooltip from "./Tooltip";

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim().toLowerCase());
  }

  return (
    <div className="flex items-center bg-purple-50 justify-center flex-col p-10">
      <h2 className="text-4xl mb-10 text-purple-900 font-semibold">
        What are you looking for today?
      </h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="w-64 border-b-2 border-purple-900 focus:border-purple-400 p-2 bg-transparent outline-none"
        />
        <Tooltip text="Search">
          <button type="submit" className="text-purple-400 hover:text-purple-900">
            <Search className="w-6 h-6" />
          </button>
        </Tooltip>
      </form>
    </div>
  );
};

export default Searchbar;
