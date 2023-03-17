import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // method No: 1
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    // method No: 2
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   })
    // },
  })

  const handleDelete = () => {
    if (window.confirm(`This action was made possible using Apollo Client. Are you sure you want to delete ${client.name}? Even if you say 'ok', I can't let you delete this client right now.`)) {
      // deleteClient()
    }
  }

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={handleDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}