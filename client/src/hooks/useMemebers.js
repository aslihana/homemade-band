import axios from 'axios'
import { useQuery } from 'react-query'

export function useMembers () {
    const shouldRefetch = process.env.NODE_ENV === 'production'

    return useQuery(
        ['members'],
        async () => (await axios.get('http://localhost:8800/members')).data,
        {
            refetchOnReconnect: shouldRefetch,
            refetchOnWindowFocus: shouldRefetch,
            refetchOnMount: shouldRefetch,
            placeholderData: []
        }
    )
}
