import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { deleteCartProductThunk } from "../redux/actions";

const CartProduct = ({prodObj}) => {

    const dispatch = useDispatch()
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if(deleteId){
            dispatch(deleteCartProductThunk(deleteId))
        }
    }, [dispatch, deleteId])

    return (
        <div className="fondo">
            <h1>{prodObj.product.name}</h1>
            <h3>Cantidad: {prodObj.quantity} </h3>
            <h3>Total: ${prodObj.product.price * prodObj.quantity}</h3>
            <button className="fcc-btn btn btn-primary fs-5" onClick={() => setDeleteId(prodObj.id)} >X</button>
        </div>
    )
}

export default CartProduct