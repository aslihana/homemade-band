import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [member, setMember] = useState({
        name: "",
        position: "",
        experience: "",
        wage: null,
    });

    const navigate  = useNavigate();
    const location = useLocation();

    const memberId = location.pathname.split("/")[2];

    console.log(location.pathname.split("/")[2])

    const handleChange = (e) =>  {
        setMember(prev=>({...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
      e.preventDefault();

      try {
        await axios.put("http://localhost:8800/"+ memberId, member);
        navigate("/");
    } catch(err) {
        console.log(err);
      }

    }

    console.log(member);

    return (
        <div className="form">
            <h1>Update the Member</h1>
            <input type="text" placeholder="name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="position" onChange={handleChange} name="position"/>
            <input type="text" placeholder="experience" onChange={handleChange} name="experience"/>
            <input type="number" placeholder="wage" onChange={handleChange} name="wage"/>
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;