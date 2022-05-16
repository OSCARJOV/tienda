import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductItem from "../components/ProductItem"
import { setCategoriesThunk, setProductThunk } from "../redux/actions"

const Shop = () => {

    const dispatch = useDispatch()
    const productArr = useSelector(state => state.products)
    const categoriesArr = useSelector(state => state.categories)

    const [currentCategory, setCurrentCategory] = useState('')

    useEffect(() => {
        dispatch(setProductThunk(currentCategory))
        dispatch(setCategoriesThunk())
    }, [dispatch, currentCategory])


    const list = productArr.map((item) => <ProductItem key={item.id} prodObj={item} />)
    const categoriesList = categoriesArr.map(item => <button className="fcc-btn btn btn-primary fs-5" key={item.id} onClick={() => setCurrentCategory(item.id)} >{item.name}</button>) 

    return (
        <div className="fondo">
            <h1 className="contenedor navegacion">
            <a class="fcc-btn btn btn-primary fs-5" href="/Shop">Shop</a>  
            <a class="fcc-btn btn btn-primary fs-5" href="/Cart">Cart</a>  
            <a class="fcc-btn btn btn-primary fs-5" href="/Login">Logout</a>  
            </h1>
            <h2 className="oblique">ESMERALDA</h2>
            <img src="/src/Imagen/JOYA" alt=""></img>
            <button className="btn btn-primary fs-5" onClick={() => setCurrentCategory('')} >
                All Products
            </button>
            {categoriesList}
            {list}
        </div>
    )
}
export default Shop
