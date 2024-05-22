import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import { Button } from "react-bootstrap";
import EditCountry from "./EditCountry";


 //const baseurl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl="
//const baseurl='../wwwroot/';
function CountryCard({country,onDelete,onEdit})
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    
   async function handleClickForDelete(id){
        try {
            const response=await axios.delete('/Country/'+id)
            if(response){
               
                onDelete();
            }
       
        } catch (error) {
            console.log(error)
        }
      }
    async function handleClickForEdit(id){
        const response= await axios.put('/Country/'+id);
        if(response){
               
            onEdit();
        }
    }
    return(
    <div className="card m-2">   
      <img src={require('../wwwroot/Country/'+country.countryImage)} className="card-img-top" alt={country.countryImage}></img>
        <div className="card-body">
            <h5 className="card-title">{country.countryName}</h5>
            <p className="card-text">{country.countryDescription}</p>
            <Link className="btn btn-primary m-1 w-25" to={`/View/${country.countryId}`}>View</Link>
            <button 
                className="btn btn-warning m-1 w-25" 
                data-bs-toggle="modal" 
                onClick={handleShow}>
                    Edit
            </button>
            <button 
                className="btn btn-danger m-1 w-25" 
                onClick={handleDeleteShow}>
                    Delete
            </button>
        </div>
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Exsisting Country Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditCountry selectedCountryId={country.countryId} 
                onEdit={()=>{
                    onEdit()
                    handleClose()
                    }}/>
              </Modal.Body>           
          </Modal>

          <Modal show={showDelete} onHide={handleDeleteClose}>
              <Modal.Header closeButton>
                <Modal.Title>Do you want to Delete</Modal.Title>
              </Modal.Header>
              <div className="modal-footer">
                <button type="button" class="btn btn-primary"
                onClick={()=>{
                    handleClickForDelete(country.countryId)
                }}>
                    Yes
                </button>
                <button type="button" class="btn btn-secondary" onClick={handleDeleteClose}>No</button>
              </div>          
          </Modal>
        </div>
    )
}





export default CountryCard;