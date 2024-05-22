import axios from "axios";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
const initialCountryInfo = {
    cityName:'',
    cityDescription:'',
    cityImage:'',
    transportation:''

}
function AddCity({onAdd}){

    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const[cityInfo, setCityInfo]= useState(initialCountryInfo);
   
    let params= useParams();
   
    const AddNewCity = async()=>{
        try {
     
            const formData= new FormData();
            formData.append("cityName",cityInfo.cityName);
            formData.append("cityDescription",cityInfo.cityDescription);
            formData.append("cityImageFile",file);
            formData.append("cityImage",cityInfo.cityImage);
            formData.append("transportation",cityInfo.transportation);
            formData.append("countryId",params.id);

            // for (const value of formData.values()) {
            //     console.log(value.name+"---"+value);
            //   }
            const response= await axios.post('/City',formData)
            if(response)
            console.log(response)
            onAdd();
            
        } catch (error) {
        console.log(error)
        }
    }
    
    const handleFileChange=(e)=>{
        
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
        setCityInfo({...cityInfo, cityImage: e.target.files[0].name})
    }
    return (
    <div >
        <div className="mb-3">
            <label htmlFor="countryName" className="form-label">City Name</label>
            <input type="text" className="form-control" id="countryNameInput" 
            placeholder="Enter Country Name"
            value={cityInfo.cityName}
            onChange={e=>setCityInfo({...cityInfo, cityName: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="countryDescription" className="form-label">City Description</label>
            <textarea className="form-control" id="countryDescriptionTextarea" rows="3"
            value={cityInfo.cityDescription}
            onChange={e=>setCityInfo({...cityInfo, cityDescription: e.target.value})}
            >

            </textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="countryTransportation" className="form-label">City Transportation</label>
            <textarea className="form-control" id="countryTransportationTextarea" rows="3"
            value={cityInfo.transportation}
            onChange={e=>setCityInfo({...cityInfo, transportation: e.target.value})}
            >

            </textarea>
        </div>
        <div>
        <label htmlFor="countryImage" className="form-label">City Image</label>
         </div>
        <div className="input-group mb-3">
            
            <input type="file" className="form-control" 
           
            onChange={handleFileChange}
            />
            <label className="input-group-text" htmlFor="inputGroupFileUpload">Upload</label>
        </div>
        <div>
        <img className="img-thumbnail" src={fileUrl} />
        </div>
        <button className="btn btn-success" onClick={()=>AddNewCity()}>AddNewCity</button>
    </div>
    )
         
    
}

export default AddCity;

