import React from "react";
import CountryCard from "./CountryCard";

function CountryList({countries,onEdit,onDelete}){
    return(
        <div className="">
        <div className="row">
            {countries.map((country)=>(
                
                <div className="col-md-4" key={country.countryId}>
                <CountryCard country={country} onEdit={onEdit} onDelete={onDelete}/>
                </div>
            ))}
        </div>
        </div>
    )
}
export default CountryList;