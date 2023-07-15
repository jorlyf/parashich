import React from "react";
import { Input } from "antd";

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({ value, setValue, placeholder = "", className, disabled = false }) => {
  return (
    <Input
      value={value}
      onChange={x => setValue(x.target.value)}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
}

export default Search;
