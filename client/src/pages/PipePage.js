import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useHistory, useParams } from 'react-router-dom';



function PipePage() {

  let { pipelineid } = useParams();
  const [pipelineObject, setPipelineObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/dashboard/myPipelines/${pipelineid}`, {
      headers: {
          accessToken: localStorage.getItem("accessToken"),
      }
  }).then((response) =>{
      setPipelineObject(response.data);
    })
  }, []);

    

    const editPipeline = (option) => {
      if (option === "pipelineName") {
        let newpipelineName = prompt("Enter new name for pipeline: ");
        axios.put("http://localhost:3001/dashboard/editName", { 
          newpipelineName: newpipelineName, 
          id: pipelineid,
        }, 
        {
          headers: {
              accessToken: localStorage.getItem("accessToken"),
          }
      });

      setPipelineObject({...pipelineObject, pipelineName: newpipelineName});

      } else if (option === "actions") {
        let newactions = prompt("Enter new actions for pipe: ");
        axios.put("http://localhost:3001/dashboard/editActions", { 
          newactions: newactions, 
          id: pipelineid,
        }, 
        {
          headers: {
              accessToken: localStorage.getItem("accessToken"),
          }
      });

      setPipelineObject({...pipelineObject, actions: newactions});

      } else {

      }
    }

   

  return ( 
  <div >
    pipeline name:
    <h1 onClick = {() => {
      editPipeline("pipelineName");
    }}>{ pipelineObject.pipelineName}</h1> <button onClick = {() => {
      editPipeline("pipelineName");
    }}> edit </button>
    <div onClick = {() => {
      editPipeline("actions");
    }}>{ pipelineObject.actions } </div>
    <div> State of pipeline: { pipelineObject.stateOfPipeline }</div>
    <div>{ pipelineObject.createdAt }</div>
    <div>{ pipelineObject.updatedAt }</div>

    
  </div>)
   
  

  }
export default PipePage;