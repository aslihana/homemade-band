import React from 'react'
import { Link } from 'react-router-dom'
import { useMembers } from '../hooks/useMemebers'
import { useDeleteMember } from '../hooks/useDeleteMember'
import './Members.style.css'

const Members = () => {
    const { data: members } = useMembers()
    const { mutate: handleDelete } = useDeleteMember()

    return (
        <div>
            <h1>Members</h1>
            <div className='members'>
                {
                    members.map(member => ( 
                        <div className='member' key={member.id}>
                            <h2>{member.name}</h2>
                            <p>{member.position}</p>
                            <p>{member.experience}</p>
                            <p>{member.wage}</p>
                            <button className='delete' onClick={() => handleDelete(member.id)}>Delete</button>
                            <button className='update'><Link to={`/update/${member.id}`}>Update</Link></button>
                        </div> 
                    ))
                }
            </div>
           
            <button className='add-new'>
                <Link to='/add'>Add new member</Link>
            </button>
        </div>
    )
}

export default Members
