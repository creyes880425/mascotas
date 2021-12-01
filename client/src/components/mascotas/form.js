import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Row, Form, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const initialState = {
    tipo: '',
    nombre: '',
    edad: 0,
    color: '',
    juguetes: []
}

const MascotaForm = (props) => {

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarValor = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const volver = e => {
        e.stopPropagation();
        navigate('../')
    }

    const guardar = e => {
        e.preventDefault();
        const data = { ...inputs };
        data._id = id;
        props.accion(data);
    }

    useEffect(() => {
        if (id) {
            axios.get(`/api/mascotas/${id}`)
                .then(resp => setInputs(resp.data.data))
                .catch(error => Swal.fire('Error', 'Error al obtener la mascota, inténtelo mas tarde', 'error'));
        }
    }, [])

    return <>
        <Row>
            <h1>{props.edicion ? 'Editando la moscota:' + inputs?.name : props.ver ? 'Visualizando la mascota' + inputs?.name : 'Creando una nueva mascota'}</h1>
        </Row>
        <Row>
            <Form onSubmit={guardar}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Especie:</Label>
                            <Input type="text" minLength={3} required name="tipo" value={inputs.tipo} onChange={actualizarValor} disabled={props.ver} />
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre:</Label>
                            <Input type="text" minLength={3} required name="nombre" value={inputs.nombre} onChange={actualizarValor} disabled={props.ver} />
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Edad:</Label>
                            <Input type="number" min={0} max={120} required name="edad" value={inputs.edad} onChange={actualizarValor} disabled={props.ver} />
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Color:</Label>
                            <Input type="color" minLength={3} required name="color" value={inputs.color} onChange={actualizarValor} disabled={props.ver} />
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Juguetes:</Label>
                            <Input type="text" name="juguetes" value={inputs.juguetes} onChange={actualizarValor} disabled={props.ver} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Col xs={3}>
                            {props.accion && <Button type="submit">Guardar</Button>}
                        </Col>
                        <Col xs={3}>
                            <Button type="button" onClick={volver}>Volver</Button>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </Row>

    </>
}

export default MascotaForm;