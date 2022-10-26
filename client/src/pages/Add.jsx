import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddMember } from "../hooks/useAddMember";

const Add = () => {
    const [member, setMember] = useState({
        name: "",
        position: "",
        experience: "",
        wage: 0
    })
    const handleChange = ({ target }) => setMember({ ...member, [target.name]: target.value })

    const navigate = useNavigate()

    const { mutate } = useAddMember({ onSuccess: () => navigate('/') })
    const handleClick = () => mutate(member)

    return (
        <div className="form">
            <h1>Add New Member</h1>
            <input type="text" placeholder="name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="position" onChange={handleChange} name="position"/>
            <input type="text" placeholder="experience" onChange={handleChange} name="experience"/>
            <input type="number" placeholder="wage" onChange={handleChange} name="wage"/>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add
