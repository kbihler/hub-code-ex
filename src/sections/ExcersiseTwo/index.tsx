import React, { useState, useEffect } from "react";
import { MultiFilter, RadioFilter } from "./components";
import { formatArray } from "../../lib/utils";
import { Media, FilterTypes } from "../../lib/types";

const dataUrl = "https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json";

export const ExcersieTwo = () => {
  const [data, setData] = useState<Media>();
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.CLEAR);
  const [searchData, setSearchData] = useState(data);

  const getData = async () => {
    try{
      const response = await fetch(dataUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch(error) {
      console.error(error);
    };
  };

  useEffect(() => {
    getData();
  }, []);

  const items = data ? data.media.sort((a, b) => a.title.localeCompare(b.title)): null; 

  const years = data ? data.media.map((item: { year: any; }) => item.year): null;
  const uniqueYears = Array.from(new Set(years)).sort((a: any, b: any) => a.localeCompare(b));

  const itemTypes = data ? data.media.map((item: { type: any; }) => item.type): null;
  const uniqueTypes = Array.from(new Set(itemTypes));

  const genres = data ? data.media.map((item: { genre: any; }) => item.genre): null;
  const flatGenre = genres ? genres.reduce((acc, val) => acc.concat(val), []): null;
  const uniqueGenre = Array.from(new Set(flatGenre)).sort((a: any, b: any) => a.localeCompare(b));

  const searchItem = (query: any) => {
    if (!query) {
      return;
    }
    query = query.toLowerCase();
  };

  const ListItems = () => {

    let filteredItems = items;
    if (filterType === "genre") {
      filteredItems = filteredItems ? filteredItems.filter(
          item => item.genre.some(genre => filter.some(filter => filter == genre))
        ): null;
    } 
    else if (filterType === "year" || filterType === "type") {
      filteredItems = filteredItems ? filteredItems.filter(
        item => filter.some(filter => filter == item[filterType])
      ): null;
    } 

    return(
      <div className="container">
        {filteredItems ? filteredItems.map((filteredItem: any) => (
            <div className="card" key={filteredItem.title}>
              <img src={filteredItem.poster} alt={filteredItem.title}/>
              <div className="card-content">
                <h3 className="card-title">
                  {filteredItem.title} ({filteredItem.year})
                </h3>  
                <div className="card-sub">
                  Genres: {formatArray(filteredItem.genre)} 
                </div> 
              </div>
            </div>
        )): null}
      </div>
    );  
  };

  const handleClear = () => {
    setFilter([]);
    setFilterType(FilterTypes.CLEAR)
  }

  const ClearFilter = () => {
    return (
      <div className="clear-filter">
        <a onClick={ handleClear }>Clear Filter</a>
      </div>
    )
  }

  return (
      <div>
        <div className="exercise-header">
          <h2>Exercise 2 - Filterable Content</h2>
        </div>
        <div className="media-wrapper">
          <div className="flex-row">
            <MultiFilter 
              type={FilterTypes.GENRE} 
              options={uniqueGenre} 
              setFilter={setFilter} 
              setFilterType={setFilterType} 
              filterType={filterType}/>  
            <MultiFilter 
              type={FilterTypes.YEAR} 
              options={uniqueYears} 
              setFilter={setFilter} 
              setFilterType={setFilterType} 
              filterType={filterType}/>
            <div className="search-box"> 
              <input
              type="text"
              id="header-search"
              onChange={(e) => searchItem(e.target.value)}
              name="s" 
              />
              <button><i className="fa fa-search"></i></button>
            </div>
          </div>
          <div className="flex-row">
            <RadioFilter 
              type={FilterTypes.TYPE} 
              options={uniqueTypes} 
              setFilter={setFilter} 
              setFilterType={setFilterType} 
              filterType={filterType}/>    
            <ClearFilter />
          </div>
          <ListItems />
        </div>
      </div>
  );
};