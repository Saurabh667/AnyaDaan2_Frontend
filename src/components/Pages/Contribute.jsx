import React, { useState } from "react";
import "./Contribute.css";
import Footer from "../Footer";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Contribute = () => {
  const [imageName, setImageName] = useState("");
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [contributionType, setContributionType] = useState("");
  const [description,setDescription]=useState('');
  const [message,setMessage]=useState('');
  const [image, setImage] = useState(null);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault()
    setLoading(true)
    const contributionData={
        name,email,contributionType,imageName,description,message
        };
  console.log(contributionData);
  try{
    const response=await axios.post(
                    "http://127.0.0.1:8000/api/donationData/",
                    contributionData,
                    { headers: { "Content-Type": "application/json" } }
                    );
    console.log(response,"this data is send to backend")
    console.log(response.data)
    navigate('/thankyou')
    
  }
  catch(error){
    console.error("error are",error.response?.data);
  }
  finally{
    setLoading(false)
  }
  
  };
  return (
    <>
    <div className="contribute-wrapper">
        <form onSubmit={handleSubmit} className="contributeForm form">
      <div className="contribute-card">
        <h2>Contribute Now</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" onChange={(e)=> setName(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Contribution Type</label>
          <select value={contributionType}
                  onChange={(e) => setContributionType(e.target.value)}>
            <option>Select an option</option>
            <option>Food Donation</option>
            <option>Money Donation</option>
            <option>Volunteer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Image</label>

          <div className="upload-box">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) =>
                setImageName(e.target.files[0]?.name || "")
              }
            //   onChange={(e)=> setImage(e.target.files[0])}
            />
            <label htmlFor="imageUpload" className="upload-btn">
              Choose Image
            </label>
            {imageName && <span className="file-name">{imageName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Write the description of donation..." onChange={(e)=> setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea placeholder="Write a short message..." onChange={(e)=>setMessage(e.target.value)}></textarea>
        </div>
              {loading?(<button className="submit-btn" type="submit" disabled={true} >Please Wait....</button>):(<button className="submit-btn" type="submit" >Submit Contribution</button>)}
        
      </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Contribute;
