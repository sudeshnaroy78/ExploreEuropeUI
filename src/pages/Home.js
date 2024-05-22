import React, { useEffect } from "react";
import CountryList from './CountryList';
import { useState } from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import AddCountry from "./AddCountry";


function Home(){

const [countries,setCountries]= useState([]);
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  

useEffect(() => {
  getAllCuntries();
}, []);

const getAllCuntries = async ()=>{
  try {
    fetch('/Country')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCountries(data)});
    }
  catch (error) {
    
  }
}
const handleDeleteCountry=()=>{
  getAllCuntries();   
}


    return(
        <div>  
          <h1 className='m-3'>Explore Europe</h1>
          <span className='m-3'>Start with Country details:</span>
          {/* <!-- #region AddButton  --> */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success me-md-2" data-bs-toggle="modal" 
             type="button" onClick={handleShow}>Add Country</button>
          </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Country Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddCountry onAdd={()=>{
                  handleClose()
                  getAllCuntries()
                  }}/>
              </Modal.Body>           
          </Modal>
          {/* <!--#endregion --> */}
        <div>
          <CountryList 
          onEdit={()=>{
            handleClose() 
            getAllCuntries()
          }} 
            onDelete={handleDeleteCountry} 
            countries={countries}
            />
        </div>
      
       

        
        </div>
    )
}

export default Home;