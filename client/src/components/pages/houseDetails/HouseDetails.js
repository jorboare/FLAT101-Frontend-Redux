import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, deleteProduct, getEditProduct } from '../../../actions/housesActions'


const HouseDetails = () => {

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        const getHouseDetails = () => dispatch(getProductDetails(params.id))
        getHouseDetails()
    }, [dispatch, params.id])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const house = useSelector(state => state.houses.oneProduct)

    //Eliminar Casa
    const deleteHouses = id => dispatch(deleteProduct(id))

    function deleteHouse() {
        deleteHouses(params.id)
        history.push('/')

    }


    //Mandar datos a edición
    const setHouseToEdit = () => dispatch(getEditProduct(house))

    function editHouse(house) {
        setHouseToEdit()
        history.push(`/edit/${house._id}`)
    }

    return (
        <Container className='house-details'>
            {house !== null ?
                <Row>
                    <Col md={12}>
                        <div className='house-detail-img-container'>
                            <img src={house.img} alt='house' className='house-details-img' />
                            <h2>{house.name}</h2>
                        </div>


                        <h3>Sobre {house.name}:</h3>

                        <p>{house.description}</p>

                        <p className='house-details-price'>{numberWithCommas(house.price)} €</p>

                        <div className='detail-btn'>

                            <button className='btn btn-edit' onClick={() => editHouse(house)}>Editar</button>

                            <button className='btn btn-delete' onClick={() => deleteHouse()}>Eliminar</button>
                        </div>

                    </Col>
                </Row>

                :
                null
            }


        </Container>
    );
}

export default HouseDetails;