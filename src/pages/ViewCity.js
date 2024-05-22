import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AddAttraction from "./AddAttraction";
import EditAttraction from "./EditAttraction";
const initialAttractionInfo = [{
    attractionId:0,
     attractionName:"",
     description:"",
    attractionImage:"",
     location:"",
     attractionType:""

     }]
function ViewCity(){
    const baseurl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl="
  

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);
    const [selectedAttractionId, setSelectedAttractionId] = useState("");

    const [attractions,setAttractions]=useState(initialAttractionInfo);
    let params= useParams();

    useEffect(()=>{
        fetchAttractionByCityId(params.id)
       },[])
      
       const fetchAttractionByCityId= async(id)=>{
        //console.log("inside func"+id)
        const url="/Attraction/"+id+"/GetAttractionByCityId"
        const response= await axios.get(url)
        if(response)
        {
          console.log(response);
          setAttractions(response.data)
        }
       }

       const handleClickForDelete = async(id)=>{
        try {
          const response=await axios.delete('/Attraction/'+id)
          if(response){
             
            fetchAttractionByCityId(params.id)
          }
      } catch (error) {
          console.log(error)
      }
      }
    return(
        <div>
       Attraction Details:
       <div className="col-md-4" ></div>
           {/* <!-- #region AddButton  --> */}
           <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success me-md-2" data-bs-toggle="modal" 
             type="button" onClick={handleShow}>Add New Attraction</button>
          </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Attraction Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddAttraction onAdd={()=>{
                  handleClose()
                  fetchAttractionByCityId(params.id)
                  }}/>
              </Modal.Body>           
          </Modal>
           {/* <!--#endregion --> */}
       <h5 className="card-title">City Id:{params.id}</h5>
       {
  attractions.map((attraction)=>(

<div className="card mb-3" key={attraction.attractionId} >
<div className="row g-0">
    <div className="col-md-4">
    {/* <img src={require('../wwwroot/City/'+city.cityImage)} className="card-img-top" alt={city.cityImage}></img> */}
     <img src={baseurl+attraction.attractionImage} className="card-img-top" alt={attraction.attractionImage}></img>
      {/* <img src={window.location.origin+'/wwwroot/City/'+city.cityImage} className="img-fluid rounded-start" alt={city.cityImage}></img> */}
      {/* <img src={process.env.PUBLIC_URL+'/logo192.png'} />  */}
    </div>
    <div className="col-md-8">
        <div className="card-body">
            <h5 className="card-title">{attraction.attractionName}</h5>
            <p className="card-text"><small className="text-body-secondary">{attraction.attractionId}</small></p>
            <p className="card-text">attractionType: {attraction.attractionType}</p>
            <p className="card-text">attractionDescription : {attraction.description}</p>
            <p className="card-text">attractionTransportation: {attraction.location}</p>
            
            {/* <button href="#" className="btn btn-primary ">Continue</button> */}
            <Link className="btn btn-primary m-1 w-20" to={`/ViewAttraction/${attraction.attractionId}`}>View</Link>
            <button 
                className="btn btn-warning m-1 w-20" 
                data-bs-toggle="modal" 
                onClick={()=>{
                  handleEditShow()
                  setSelectedAttractionId(attraction.attractionId)
                }}>
                    Edit
            </button>
            <button 
                className="btn btn-danger m-1 w-20" 
                onClick={()=>handleClickForDelete(attraction.attractionId)}>
                    Delete
            </button>
        </div>
    </div>
          
  </div>
</div>
 ))}
 <Modal show={showEdit} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Existing Attraction Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditAttraction selectedAttractionId={selectedAttractionId}  onEditAttraction={()=>{
                  handleEditClose()
                  fetchAttractionByCityId(params.id)
                  }}/>
              </Modal.Body>           
          </Modal>
        </div>
    )
}
export default ViewCity;