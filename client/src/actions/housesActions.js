import {
    GET_PRODUCTS,
    GET_PRODUCT_DETAILS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    HOUSE_TO_UPDATE,
    NEW_PRODUCT
} from '../types/index'

import HouseService from '../service/house.service'

const houseService = new HouseService()

//Obtener productos
export function getProducts() {
    return (dispatch) => {

        houseService
            .getHouses()
            .then(res => dispatch(downloadProducts(res.data)))
            .catch(err => {
                console.log(err)
            })

    }
}

const downloadProducts = products => ({
    type: GET_PRODUCTS,
    payload: products
})

//Detalle Productos

export function getProductDetails(id) {
    return (dispatch) => {

        houseService
            .getHouseDetails(id)
            .then(res => dispatch(downloadProductDetails(res.data)))
            .catch(err => {
                console.log(err)
            })

    }
}

const downloadProductDetails = product => ({
    type: GET_PRODUCT_DETAILS,
    payload: product
})

//Eliminar producto

export function deleteProduct(id) {
    return (dispatch) => {

        houseService
            .delete(id)
            .then(res => dispatch(deleteProductSuccess(res._id)))
            .catch(err => {
                console.log(err)
            })

    }
}

const deleteProductSuccess = id => ({
    type: DELETE_PRODUCT,
    payload: id
})

//Colocar casa para edición

export function getEditProduct(product) {
    return (dispatch) => {
        dispatch(setEditProduct(product))
    }
}

const setEditProduct = product => ({
    type: HOUSE_TO_UPDATE,
    payload: product
})
//Editar casa

export function editProduct(product) {
    return (dispatch) => {

        houseService
            .editHouse(product._id, product)
            .then(res => dispatch(editProductSuccess(product)))
            .catch(err => {
                console.log(err)
            })

    }
}

const editProductSuccess = product => ({
    type: EDIT_PRODUCT,
    payload: product
})


// nueva casa

export function addProduct(product) {
    return (dispatch) => {
        houseService
            .newHouse(product)
            .then(res =>
                dispatch(addProductSuccess(res.data))
            )
            .catch(err => {
                console.log(err)
            })
    }
}


const addProductSuccess = product => ({
    type: NEW_PRODUCT,
    payload: product
})
