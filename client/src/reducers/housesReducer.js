import {
    GET_PRODUCTS,
    GET_PRODUCT_DETAILS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    HOUSE_TO_UPDATE,
    NEW_PRODUCT
} from './../types/index'

//Cada reducer tiene su propio state
const initialState = {
    products: [],
    error: null,
    oneProduct: null,
    productToUpdate: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return ({
                ...state,
                oneProduct: null,
                products: action.payload
            })
        case GET_PRODUCT_DETAILS:
            return ({
                ...state,
                oneProduct: action.payload
            })
        case DELETE_PRODUCT:
            return ({
                ...state,
                products: state.products.filter(elm => elm._id !== action.payload)
            })
        case HOUSE_TO_UPDATE:
            return ({
                ...state,
                productToUpdate: action.payload
            })
        case EDIT_PRODUCT:
            return ({
                ...state,
                productToUpdate: undefined,
                oneProduct: action.payload,
                products: state.products.map(elm => elm._id === action.payload._id ? elm = action.payload : elm)
            })
        case NEW_PRODUCT:
            return ({
                ...state,
                productToUpdate: undefined,
                products: [...state.products, action.payload]
            })
        default:
            return state;
    }
}