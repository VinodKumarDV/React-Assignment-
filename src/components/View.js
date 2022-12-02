import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({ connections, deleteFrd }) => {
    
    return connections.map(prod=>(
        <tr key={prod.id}>
            <td className='text-uppercase'>{prod.name}</td>
            <td id='frdTxt' className='text-uppercase'>{prod.friends[0]} {prod.friends[1]} {prod.friends[2]} {prod.friends[3]}</td>
            <td className='delete-btn' onClick={() => deleteFrd(prod.id)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
))
}
