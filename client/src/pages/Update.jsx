import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateMember } from '../hooks/useUpdateMember'

const Update = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [member, setMember] = useState({
        id: parseInt(location.pathname.split('/').pop()),
        name: '',
        position: '',
        experience: '',
        wage: 0,
    })
    const handleChange = ({ target }) => setMember({ ...member, [target.name]: target.value })

    const { mutate } = useUpdateMember({
        onSuccess: () => navigate('/')
    })
    const handleClick = () => mutate(member)

    return (
        <div className='form'>
            <h1>Update the Member</h1>
            <input type='text' placeholder='name' onChange={handleChange} name='name'/>
            <input type='text' placeholder='position' onChange={handleChange} name='position'/>
            <input type='text' placeholder='experience' onChange={handleChange} name='experience'/>
            <input type='number' placeholder='wage' onChange={handleChange} name='wage'/>
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update
