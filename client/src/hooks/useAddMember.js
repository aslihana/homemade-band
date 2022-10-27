import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export function useAddMember ({ onSuccess }) {
    const doUpdate = async member => axios.post(`http://localhost:8800/members`, member)
    const client = useQueryClient()

    return useMutation(
        doUpdate,
        {
            // Use the data from the server to make sure all members have an ID
            onSuccess: ({ data: member }) => {
                client.setQueryData(['members'], members => [...members, member])
                onSuccess && onSuccess()
            }
        }
    )
}
