import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import AddCity from "./AddCity";
import EditCity from "./EditCity";

function ViewCountry(){
    const baseurl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl="
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);
    const [selectedCityId, setSelectedCityId] = useState("");
    const [cities,setcities]=useState([{
      cityId:0,
      cityName:"",
      cityDescription:"",
      cityImage:"",
      transportation:"",

      }]);

    let params= useParams();

 useEffect(()=>{
  fetchCityByCountryId(params.id)
 },[])

 const fetchCityByCountryId= async(id)=>{
  //console.log("inside func"+id)
  const url="/City/"+id+"/GetCityByCountryId"
  const response= await axios.get(url)
  if(response)
  {
    console.log(response);
    setcities(response.data)
  }
 }
   
const handleClickForDelete = async(id)=>{
  try {
    const response=await axios.delete('/City/'+id)
    if(response){
       
      fetchCityByCountryId(params.id)
    }
} catch (error) {
    console.log(error)
}
}
    return(
<div>Cities Details:
    <div className="col-md-4" ></div>
            {/* <!-- #region AddButton  --> */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success me-md-2" data-bs-toggle="modal" 
             type="button" onClick={handleShow}>Add New City</button>
          </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New City Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddCity onAdd={()=>{
                  handleClose()
                  fetchCityByCountryId(params.id)
                  }}/>
              </Modal.Body>           
          </Modal>
           {/* <!--#endregion --> */}
<h5 className="card-title">CountryId:{params.id}</h5>

{
  cities.map((city)=>(

<div className="card mb-3" key={city.cityId} >
<div className="row g-0">
    <div className="col-md-4">
    {/* <img src={require('../wwwroot/City/'+city.cityImage)} className="card-img-top" alt={city.cityImage}></img> */}
     <img src={baseurl+city.cityImage} className="card-img-top" alt={city.cityImage}></img>
      {/* <img src={window.location.origin+'/wwwroot/City/'+city.cityImage} className="img-fluid rounded-start" alt={city.cityImage}></img> */}
      {/* <img src={process.env.PUBLIC_URL+'/logo192.png'} />  */}
    </div>
    <div className="col-md-8">
        <div className="card-body">
            <h5 className="card-title">{city.cityName}</h5>
            <p className="card-text"><small className="text-body-secondary">{city.cityId}</small></p>
            <p className="card-text">CityDescription : {city.cityDescription}</p>
            <p className="card-text">CityTransportation: {city.transportation}</p>
            {/* <button href="#" className="btn btn-primary ">Continue</button> */}
            <Link className="btn btn-primary m-1 w-20" to={`/ViewCity/${city.cityId}`}>View</Link>
            <button 
                className="btn btn-warning m-1 w-20" 
                data-bs-toggle="modal" 
                onClick={()=>{
                  handleEditShow()
                  setSelectedCityId(city.cityId)
                }}>
                    Edit
            </button>
            <button 
                className="btn btn-danger m-1 w-20" 
                onClick={()=>handleClickForDelete(city.cityId)}>
                    Delete
            </button>
        </div>
    </div>
          
  </div>
</div>
 ))}
 <Modal show={showEdit} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Existing City Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditCity selectedCityId={selectedCityId}  onEditCity={()=>{
                  handleEditClose()
                  fetchCityByCountryId(params.id)
                  }}/>
              </Modal.Body>           
          </Modal>
</div>        
)
}
export default ViewCountry;