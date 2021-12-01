import { Link } from 'react-router-dom';
import { List, Row, Table } from 'reactstrap';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { useContext } from 'react';
import UserContext from '../../context/user-context';

const MascotaList = (props) => {

    const context = useContext(UserContext);

    const eliminar = (e, id) => {
        e.stopPropagation();
        if (id) {
            props.eliminar(id);
        }
    }

    return <Table>
        <thead>
            <tr>
                <th>Especie</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Color</th>
                <th>Juguetes</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {props.list && props.list.map((elem, i) => <tr key={i}>
                <td>{elem.tipo}</td>
                <td>{elem.nombre}</td>
                <td>{elem.edad}</td>
                <td><FaPaw color={elem.color} /></td>
                <td>{elem.juguetes}</td>
                <td>
                    {context.user.id === elem.user[0]._id && <Link to={`edit/${elem._id}`} style={{ margin: '5px' }}><AiFillEdit /></Link>}
                    {context.user.id === elem.user[0]._id && <AiFillDelete color='red' onClick={e => eliminar(e, elem._id)} style={{ margin: '5px' }} />}
                    <Link to={`view/${elem._id}`} style={{ margin: '5px' }}><AiFillEye /></Link>
                </td>
            </tr>)}
        </tbody>
    </Table>
}

export default MascotaList;