import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import HouseCard from './../houseCard/HouseCard'
import { Container, Row } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../../actions/housesActions'


const ProductsList = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        const products = () => dispatch(getProducts())
        products()
    }, [dispatch])

    const allHouses = useSelector(state => state.houses.products)

    return (
        <>
            <Container className='houses-container'>
                <h2>Nuestras casas</h2>
                <Link to='/newhouse' className='btn btn-newHouse'>Añadir una casa</Link>
                <Row className='justify-content-center'>
                    {allHouses === 0 ? <p>No hay casas</p>
                        :
                        allHouses.map(elm =>
                        (
                            <HouseCard key={elm._id} {...elm} />
                        ))
                    }

                </Row>
            </Container>

        </>
    );
}

export default ProductsList;