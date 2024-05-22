import axios from "axios";
import React, { useState } from "react";
const initialCountryInfo = {
    countryName:'',
    countryDescription:'',
    countryImage:''

}
function AddCountry({onAdd}){

    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const[countryInfo, setCountryInfo]= useState(initialCountryInfo);

    const AddNewCountry = async()=>{
        try {
     
            const formData= new FormData();
            formData.append("CountryName",countryInfo.countryName);
            formData.append("CountryDescription",countryInfo.countryDescription);
            formData.append("CountryImageFile",file);
            formData.append("CountryImage",countryInfo.countryImage);
            // for (const value of formData.values()) {
            //     console.log(value.name+"---"+value);
            //   }
            const response= await axios.post('/Country',formData)
            if(response)
            console.log(response)
            onAdd();
            
        } catch (error) {
        console.log(error)
        }
    }
    const handleFileChange=(e)=>{
       // console.log(e.target.files);
        //console.log(e.target.files[0].name);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
       // let cArray=e.target.files[0].name.split(".")
        // setImage(cArray[0]);
        // console.log("before set1== "+cArray[0])
        // console.log("before set== "+fileUrl)
        setCountryInfo({...countryInfo, countryImage: e.target.files[0].name})
    }
    return (
    <div >
        <div className="mb-3">
            <label htmlFor="countryName" className="form-label">Country Name</label>
            <input type="text" className="form-control" id="countryNameInput" 
            placeholder="Enter Country Name"
            value={countryInfo.countryName}
            onChange={e=>setCountryInfo({...countryInfo, countryName: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="countryDescription" className="form-label">Country Description</label>
            <textarea className="form-control" id="countryDescriptionTextarea" rows="3"
            value={countryInfo.countryDescription}
            onChange={e=>setCountryInfo({...countryInfo, countryDescription: e.target.value})}
            >

            </textarea>
        </div>
        <div>
        <label htmlFor="countryImage" className="form-label">Country Image</label>
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
        <button className="btn btn-success" onClick={()=>AddNewCountry()}>AddNewCountry</button>
    </div>
    )
         
    
}

export default AddCountry;

