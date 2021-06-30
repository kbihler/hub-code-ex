import React, { useState } from "react";
import { FilterTypes } from "../../../../lib/types";

interface Props {
  options: any[];
  type: FilterTypes;
  setFilter: (filter: any) => void;
  filterType: FilterTypes;
  setFilterType: (filterType: FilterTypes) => void;
};

export const RadioFilter = ({options, type, setFilter, filterType, setFilterType}: Props) => {
  const [selected, setSelected] = useState();

  const handleChange = (e: any) => {
    setSelected(e.currentTarget.value);
    setFilter([e.currentTarget.value]);
    setFilterType(type)
  }

  const RadioForm = () => {
    return (
      <form className="radio-form">
        { options.map((item: any) => (
            <div className="radio-filter" key={item}>
              <label className="radio-label">
                <input 
                  type="radio" 
                  checked={filterType === type ? selected === item: false}
                  value={item}
                  onChange={handleChange} />
                {item}s
              </label>
            </div>
          ))
        }
      </form>
    );
  };

  return (
    <RadioForm/>
  );
};