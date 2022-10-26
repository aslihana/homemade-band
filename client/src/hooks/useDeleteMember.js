import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export function useDeleteMember () {
    const doDelete = async id => axios.delete(`http://localhost:8800/members/${id}`)
    const client = useQueryClient()

    return useMutation(
        doDelete,
        {
            onSuccess: (_, id) => {
                client.setQueryData(['members'], members => members.filter(m => m.id !== id))
            }
        }
    )
}
