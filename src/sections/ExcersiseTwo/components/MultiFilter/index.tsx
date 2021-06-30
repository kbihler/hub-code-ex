import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";
import { FilterTypes } from "../../../../lib/types";

interface Props {
  type: FilterTypes;
  options: any[];
  setFilter: (filter: any) => void;
  filterType: FilterTypes;
  setFilterType: (filterType: any) => void;
};

export const MultiFilter = ({type, options, setFilter, filterType, setFilterType}: Props) => {
  const [selected, setSelected] = useState([]);

  // Transform array to array of objects ready for multiselect options
  const filterOptions = options.map((item: any) => {
    const option = {
      "label": item,
      "value": item,
    }
    return option;
  })

  const handleChange = (selected: any) => {
    const tempFilter = selected.map((item: { value: any; }) => item.value);
      setSelected(selected);
      setFilter(tempFilter);
      setFilterType(type);
  };

  return (
    <div className="multi-filter">
      <MultiSelect
        options={filterOptions}
        value={filterType === type ? selected: []}
        onChange={handleChange}
        labelledBy={`Filter by ${type}`}
        disableSearch={true}
        hasSelectAll={false}
        overrideStrings={{
          "selectSomeItems": type
        }}
        ClearIcon={false}
      />
    </div>
  );
};
