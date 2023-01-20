import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {

  useRedirectLoggedOutUser("/login");      /* we check the login status of the user first if not logged in then we redirect to login page */
  const { id } = useParams();            /* destructuring id of the product to edit */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);     /* checking the loading state */

  const productEdit = useSelector(selectProduct);   /* gives us the data of currrent user wants to edit */

  const [product, setProduct] = useState(productEdit);      /* initially in the product we keep the data we want to edit  */
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    /* basically we didnt made it compulsory for the user to upload the image, so we check if the productEdit and prodctEdit.image exits then we set the url to the filepath to preview else nullz */
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

      /*same with the desciprtion if it has then set it else empty string  */
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));     /* creates an image url for preview */
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();          /* appending the data into the form to send it to the user */
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());  /* also after updating i get all the prodcts vapas se taaki changes are rendered actually in the UI */
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;
