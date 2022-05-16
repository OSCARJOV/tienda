import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setInfoProductThunk, setProductThunk } from "../redux/actions";
import { addProductToCart } from "../services";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productInfo);
  const filterProducts = useSelector(state => state.products)

  const [quantity, setQuantity] = useState(0)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    dispatch(setInfoProductThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(quantity && confirm){
      addProductToCart({
        product: id,
        quantity: quantity
      })
        .then((res) => {
          console.log(res)
          setConfirm(false)
        })
    }
  }, [quantity, confirm, id])

  useEffect(() => {
    if(product.category){
      dispatch(setProductThunk(product.category.id))
    }
    console.log(product)
  }, [dispatch, product])

  const decrement = () => {
    setConfirm(false)
    if(quantity > 0){
      setQuantity(quantity - 1)
    }
  }
  const increment = () => {
    setConfirm(false)
    setQuantity(quantity + 1)
  }

 
  return (
    <div className="fondo">
      <h1 className="contenedor navegacion">
            <a class="fcc-btn btn btn-primary fs-5" href="/Shop">Shop</a>  
            <a class="fcc-btn btn btn-primary fs-5" href="/Cart">Cart</a>  
            <a class="fcc-btn btn btn-primary fs-5" href="/Login">Logout</a>  



            </h1>
        <h1>{product.name}</h1>
        <div>
        <br/>
          <button className="fcc-btn btn btn-primary fs-5" onClick={decrement}>-</button>
          {quantity}
          
          <button className="fcc-btn btn btn-primary fs-5" onClick={increment} >+</button>
          <br/>
          <button className="fcc-btn btn btn-primary fs-5" onClick={() => setConfirm(true)} >Add To Cart</button>
        </div>
        <p>{product.description}</p>
        {product.images?.map((item) => <img src={item.url}  width='200px' alt='' key={item.id} />)}
       <br/>
        <h2 >Productos Relacionados</h2>
        
        { filterProducts.map(product => (
          <div key={product.id} >
            <h3>{product.name}</h3>
            <img width='200px' src={product.images[0].url} alt="" />
          </div>
        )) }
    </div>
  );
};

export default Product;
