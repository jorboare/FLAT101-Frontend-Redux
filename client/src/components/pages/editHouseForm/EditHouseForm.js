import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import HouseService from '../../../service/house.service'
import { useSelector, useDispatch } from 'react-redux'
import { editProduct } from './../../../actions/housesActions'

const houseService = new HouseService()

const NewHouseForm = () => {

    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()

    //Obtener toda la información de la casa
    const editHouse = useSelector(state => state.houses.productToUpdate)

    //state
    const [house, setHouse] = useState(editHouse)
    const [error, setError] = useState({
        status: false,
        msg: undefined
    })

    //Gestionar la entrada de texto
    const handleInputChange = e => setHouse({
        ...house,
        [e.target.name]: e.target.value
    })

    //Gestionar el submit
    const handleSubmit = e => {

        e.preventDefault()

        const { name, description, price, img, _id } = house

        //Validación de los campos
        if (name.trim() === '' || description.trim() === '' || img.trim() === '' || price <= 0) {
            setError({
                status: true,
                msg: 'Completa todos los campos'
            })
            return
        }
        //Restaurar error
        setError({
            status: false,
            msg: undefined
        })

        //Enviar datos a la base de datos

        const updateHouse = house => dispatch(editProduct(house))
        updateHouse(house)
        history.push(`/detail/${_id}`)

    }
    return (
        <>
            {
                house ?
                    <Container className='new-house-form'>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <h2><span>Editar</span> {house.name}</h2>
                                <Form
                                    onSubmit={handleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" name='name' value={house.name} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" name='description' rows={5} value={house.description} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Precio (en euros)</Form.Label>
                                        <Form.Control type="number" name='price' value={house.price} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>URL Imagen</Form.Label>
                                        <Form.Control type="text" name='img' value={house.img} onChange={handleInputChange} />
                                    </Form.Group>

                                    {error.status ? <p className='form-error'>{error.msg}</p> : null}

                                    <Button type='submit' variant='dark' className='form-btn'>Editar</Button>
                                    <Link to={`/detail/${house._id}`} type='submit' variant='dark' className='btn btn-back'>Cancelar</Link>
                                </Form>
                            </Col>
                        </Row>
                    </Container >
                    :
                    null
            }
        </>
    );
}

export default NewHouseForm;