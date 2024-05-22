import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const initialCityInfo = {
    cityId:'',
    cityName:'',
    cityDescription:'',
    cityImage:'',
    transportation:'',
    countryId:''

}
function EditCity({selectedCityId,onEditCity}){

    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const[cityInfo, setCityInfo]= useState(initialCityInfo);
   // let params= useParams();
    useEffect(()=>{
        console.log(selectedCityId)
setCityInfo({...cityInfo,cityId:selectedCityId})
FetchCityById();
    },[]);
    const FetchCityById= async()=>{
        try {
            const response = await axios.get('/City/'+selectedCityId);
            if (response)
            setCityInfo(response.data)

        } catch (e) {
            console.log(e)
        }
    }
    const EditExistCity = async()=>{
        try {
            const response= await axios.put('/City/'+selectedCityId , cityInfo)
            if(response)
            console.log(response)
            onEditCity();
            
        } catch (error) {
        console.log(error)
        }
    }
    const handleFileChange=(e)=>{
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
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
        <button className="btn btn-success" onClick={()=>EditExistCity()}>EditExistCity</button>
    </div>
    )
         
    
}

export default EditCity;

