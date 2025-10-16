"use client";
import { Input } from "@byte24/ui/components/input";
import { useDebounce } from "@byte24/ui/hooks";
import { Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface IDebounceSearchProps {
  onSearch: (search: string) => void;
  search?: string;
  setSearch?: (search: string) => void;
  outside?: boolean;
  className?: string;
  placeholder?: string;
}

export const DebounceSearch = ({
  onSearch,
  search,
  setSearch,
  outside,
  className,
  placeholder,
}: IDebounceSearchProps) => {
  const [searchInside, setSearchInside] = useState("");
  const debounceValue = useDebounce(
    outside ? (search ? search : "") : searchInside,
    500
  );

  useEffect(() => {
    onSearch(debounceValue);
  }, [debounceValue]);

  return (
    <div className={"relative w-80 " + className}>
      <Input
        id="search"
        placeholder={placeholder ?? "Zoeken..."}
        className="pl-8"
        type="text"
        value={outside ? search : searchInside}
        onChange={(e) =>
          outside
            ? setSearch
              ? setSearch(e.target.value)
              : null
            : setSearchInside(e.target.value)
        }
      />
      <Search className="h-4 w-4 text-gray-600 absolute top-1/2 left-2 -translate-y-1/2" />

      {(search || searchInside) && (
        <button
          onClick={() =>
            outside ? (setSearch ? setSearch("") : null) : setSearchInside("")
          }
          className="-translate-y-1/2 absolute top-1/2 right-2"
        >
          <XCircle className="h-4 w-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};
