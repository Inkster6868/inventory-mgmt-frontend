import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../Card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "../productDetail/ProductDetail.scss";
import DOMPurify from "dompurify";        /* imported form npm,, it is used to sanitise the code that the user enters in the description box */





const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");      /* we check the login status of the user first if not logged in then we redirect to login page */
  const dispatch = useDispatch();

  const { id } = useParams();                   /* so when the user click on eye button he will be redirected to a link which has an :id, so we will destructure that id ussing the useParams hook and will use this id to fetch the product from the database*/

  const isLoggedIn = useSelector(selectIsLoggedIn);               /* get the login status of the user */
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );                                                    /* we destructure the following from the products state.. also mind that we are getting the  "product" this time, not the "products" array  */

  const stockStatus = (quantity) => {              /* we show whetehr the product is instock or out of stock based upon the quantitiy of the product */
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));                    /* get the product from id */
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}

        {/* if we have the product then display */}

        {product && (                              
          <div className="detail">
            <Card cardClass="group">            {/* contains the image of the product  */}
              {product?.image ? (
                <img
                  src={product.image.filePath} 
                  alt={product.image.fileName}
                />         
              ) : (
                <p>No image set for this product</p>        
              )}

              {/* in the img tag we have the image uploaded to cloud so we get it for there , or if it fails then we set the alt=""  tag to the fileName*/}
               {/* again we do a conditional chaining because if by chance server takes time to fetch image then we dont want to run into error, so if it has then display or else do nothing */}
            </Card>  

            <h4>Product Availability: {stockStatus(product.quantity)}</h4>    {/* call the function to check  */}
            <hr />
            <h4>            {/*  &rarr; is used to create the arrow emoji  */}
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"Rs."}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"Rs."}
              {product.price * product.quantity}
            </p>
            <hr />


            {/* In simple words, using dangerouslySetInnerHTML, you can set HTML directly from React. DOMPurify.sanitize will remove any script ya malcious code that is being introduced by the attacker in the editor */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">          {/* we havea time stamp property in the backend, so we use that here, but it is object type so we first convert it into string */}
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>

            <br />
            
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
