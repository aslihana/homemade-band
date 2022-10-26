import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Members = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchAllMembers = async () => {
            try {
                const res = await axios.get("http://localhost:8800/members");
                setMembers(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllMembers()
    },[]);

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/members/"+id);
            window.location.reload()
        } catch(err){
            console.log(err);
        }
    }

    //console.log(members);

    return (
        <div>
            <h1>Members</h1>
            <div className="members">
            {members.map((member) => ( 
            <div className="member" key={member.id}>
               <><h2>{member.name}</h2>
               <p>{member.position}</p>
               <p>{member.experience}</p>
               <p>{member.wage}</p>
               </>
               <button className="delete" onClick={() => handleDelete(member.id)}>Delete</button>
               <button className="update"><Link to={`/update/${member.id}`}>Update</Link></button>
            
               </div> 
             ))}
            </div>
           
          <button className="addNew">
            <Link to="/add">Add new member</Link>
          </button>
          
        </div> )
}

export default Members;
