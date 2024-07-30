import React, { useState, useMemo } from "react";
import Select from "react-select";
import { customStyles } from "../util/Commonservices/customStyles";

const PAGE_SIZE = 50;

const ReactSearchSelect = ({
  isDisabled,
  options,
  id,
  name,
  onChange,
  className,
  value,
  onKeyDown,
  onKeyPress,
}) => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const selectedValue = options?.find((opt) => opt?.value === value);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options?.filter((option) =>
      option?.label?.toLowerCase().includes(inputValue?.toLowerCase())
    );
  }, [inputValue, options]);

  const paginatedOptions = useMemo(() => {
    return filteredOptions?.slice(0, page * PAGE_SIZE);
  }, [page, filteredOptions]);

  const loadMoreOptions = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Select
      options={paginatedOptions}
      value={selectedValue}
      menuPosition={"fixed"}
      maxMenuHeight={250}
      onChange={onChange}
      styles={customStyles}
      isDisabled={isDisabled}
      className={className}
      name={name}
      id={id}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      onInputChange={(value) => {
        setInputValue(value);
        setPage(1);
      }}
      onMenuScrollToBottom={loadMoreOptions}
    />
  );
};

export default ReactSearchSelect;
