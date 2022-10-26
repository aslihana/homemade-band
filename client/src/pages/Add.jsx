import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [member, setMember] = useState({
        name: "",
        position: "",
        experience: "",
        wage: null,
    });

    const navigate  = useNavigate();

    const handleChange = (e) =>  {
        setMember(prev=>({...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
      e.preventDefault();

      try {
        await axios.post("http://localhost:8800/members", member);
        navigate("/");
    } catch(err) {
        console.log(err);
      }

    }

    console.log(member);

    return (
        <div className="form">
            <h1>Add New Member</h1>
            <input type="text" placeholder="name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="position" onChange={handleChange} name="position"/>
            <input type="text" placeholder="experience" onChange={handleChange} name="experience"/>
            <input type="number" placeholder="wage" onChange={handleChange} name="wage"/>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    );
};

export default Add;