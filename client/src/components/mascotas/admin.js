import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import Header from '../home/header';
import MascotaForm from './form';
import MascotaList from './list';

const MascotaAdmin = (props) => {

    const [list, setList] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/mascotas')
            .then(resp => setList(resp.data.data))
            .catch(error =>
                swal.fire('Error', error.message, 'error'));
    }, [actualizar]);

    const agregar = (data) => {
        axios.post('/api/mascotas', data)
            .then(resp => {
                // Se agrega elemento creado al listado directamente evitando realizar una llamada al backend para recargar el listado
                setList([
                    ...list,
                    resp.data.data
                ]);
                navigate('./')
            }).catch(error => {
                console.log(error); // Revisar el mensaje de error
                Swal.fire('Error al crear la mascota', error?.message, 'error')
            });
    }

    const editar = (data) => {
        axios.put(`/api/mascotas/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar la mascota', error?.message, 'error'));
    }

    const eliminar = id => {
        if (id) {
            Swal.fire({
                title: 'Eliminar la mascota',
                text: '¿Esta seguro que desea eliminar la mascota',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if (resp.isConfirmed) {
                    axios.delete(`/api/mascotas/${id}`)
                        .then(resp => {
                            const lista = [...list];
                            lista.splice(lista.findIndex(e => e._id === id), 1);
                            setList(lista);
                        }).catch(error => Swal.fire('Error al eliminar la mascota', error?.message, 'error'));
                }
            })
        }
    }

    return <Container>
        <Header />
        <Row>
            <Link to={"./"}> Listado </Link>
            <Link to={"add"}> Agregar </Link>
            <Link to={"/"}> Home </Link>
        </Row>
        <Routes>
            <Route index element={<MascotaList list={list} eliminar={eliminar} />} />
            <Route path="add" element={<MascotaForm accion={agregar} />} />
            <Route path="edit/:id" element={<MascotaForm accion={editar} edicion={true} />} />
            <Route path="view/:id" element={<MascotaForm ver={true} />} />
        </Routes>
    </Container>;
}

export default MascotaAdmin;