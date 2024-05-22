import axios from "axios";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
const initialAttractionInfo = {
    attractionName:"",
    description:"",
   attractionImage:"",
    location:"",
    attractionType:""

}
function AddAttraction({onAdd}){

    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const[attractionInfo, setAttractionInfo]= useState(initialAttractionInfo);
   
    let params= useParams();
   
    const AddNewAttraction = async()=>{
        try {
     
            const formData= new FormData();
            formData.append("attractionName",attractionInfo.attractionName);
            formData.append("Description",attractionInfo.description);
            formData.append("attractionImageFile",file);
            formData.append("attractionImage",attractionInfo.attractionImage);
            formData.append("location",attractionInfo.location);
            formData.append("attractionType",attractionInfo.attractionType);
            formData.append("cityId",params.id);

            // for (const value of formData.values()) {
            //     console.log(value.name+"---"+value);
            //   }
            const response= await axios.post('/Attraction',formData)
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
        setAttractionInfo({...attractionInfo, attractionImage: e.target.files[0].name})
    }
    return (
    <div >
        <div className="mb-3">
            <label htmlFor="countryName" className="form-label">attraction Name</label>
            <input type="text" className="form-control" id="countryNameInput" 
            placeholder="Enter Country Name"
            value={attractionInfo.attractionName}
            onChange={e=>setAttractionInfo({...attractionInfo, attractionName: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="countryName" className="form-label">attraction Type</label>
            <input type="text" className="form-control" id="countryNameInput" 
            placeholder="Enter Country Name"
            value={attractionInfo.attractionType}
            onChange={e=>setAttractionInfo({...attractionInfo, attractionType: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="countryDescription" className="form-label">attraction Description</label>
            <textarea className="form-control" id="countryDescriptionTextarea" rows="3"
            value={attractionInfo.description}
            onChange={e=>setAttractionInfo({...attractionInfo, description: e.target.value})}
            >

            </textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="countryTransportation" className="form-label">attraction Location</label>
            <textarea className="form-control" id="countryTransportationTextarea" rows="3"
            value={attractionInfo.location}
            onChange={e=>setAttractionInfo({...attractionInfo, location: e.target.value})}
            >

            </textarea>
        </div>
        <div>
        <label htmlFor="countryImage" className="form-label">Attraction Image</label>
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
        <button className="btn btn-success" onClick={()=>AddNewAttraction()}>AddNewAttraction</button>
    </div>
    )
         
    
}

export default AddAttraction;

