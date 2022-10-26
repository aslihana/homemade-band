import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export function useUpdateMember ({ onSuccess }) {
    const doUpdate = async member => axios.put(`http://localhost:8800/members/${member.id}`, member)
    const client = useQueryClient()

    return useMutation(
        doUpdate,
        {
            onSuccess: (_, member) => {
                client.setQueryData(['members'], members => members.map(m => m.id === member.id ? member : m))                
                onSuccess && onSuccess()
            }
        }
    )
}
