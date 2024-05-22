import axios from "axios";
import React, { useEffect, useState } from "react";
const initialCountryInfo = {
    countryId:'',
    countryName:'',
    countryDescription:'',
    countryImage:''

}
function EditCountry({selectedCountryId,onEdit}){

    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const[countryInfo, setCountryInfo]= useState(initialCountryInfo);

    useEffect(()=>{
        setCountryInfo({...countryInfo,countryId:selectedCountryId})
        FetchCountryById();
    },[]);
    const FetchCountryById= async()=>{
        try {
            const response = await axios.get('/Country/'+selectedCountryId);
            if (response)
            setCountryInfo(response.data)

        } catch (e) {
            console.log(e)
        }
    }
    const EditExistCountry = async()=>{
        try {
            const response= await axios.put('/Country/'+selectedCountryId , countryInfo)
            if(response)
            console.log(response)
            onEdit();
            
        } catch (error) {
        console.log(error)
        }
    }
    const handleFileChange=(e)=>{
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setCountryInfo({...countryInfo, countryImage: e.target.files[0].name})
    }
    return (
    <div >
        <div className="mb-3">
            <label className="form-label">Country Name</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Country Name"
            value={countryInfo.countryName}
            onChange={e=>setCountryInfo({...countryInfo, countryName: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Country Description</label>
            <textarea 
            className="form-control" rows="3"
            value={countryInfo.countryDescription}
            onChange={e=>setCountryInfo({...countryInfo, countryDescription: e.target.value})}
            >

            </textarea>
        </div>
        <div>
        <label className="form-label">Country Image</label>
         </div>
        <div className="input-group mb-3">
            
            <input type="file" className="form-control"
           
           
            onChange={handleFileChange}

            />
            <label className="input-group-text">Upload</label>
        </div>
        <div>
        <img className="img-thumbnail" src={fileUrl} />
        {/* <img className="img-thumbnail" src={file} />
         value={countryInfo.countryImage}
            // onChange={handleFileChange}
        */}
        </div>
        <button className="btn btn-success" onClick={()=>EditExistCountry()}>EditExistCountry</button>
    </div>
    )
         
    
}

export default EditCountry;

