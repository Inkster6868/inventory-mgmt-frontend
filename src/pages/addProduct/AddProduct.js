import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);     /* initially the form fields will be emtpy */
  const [productImage, setProductImage] = useState("");     /* we are going to process the productImage differenlty so we defined its own state */
  const [imagePreview, setImagePreview] = useState(null);  
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });  /* name and value for every tag is different, so accordingly the name and values are mapped and are set */
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);      /* it is not "value" this time but it is files so i need the first file that will be at the 0th index */
    setImagePreview(URL.createObjectURL(e.target.files[0]));   /* this creates a preview of the file we choose */
  };

  const generateKSKU = (category) => {                  /* SKU is nothing but a unique product id which is used to identify it differently. so what we have done is to create a SKU. we chose the first three letter of the category and capitalised them, then added date.now() which made it unique */
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };


  /*  */
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();    /* this FormData() object is inbuilt in react and is used to upload file data to backend, normally we wont be able to do it in a normal object so we use this inbuilt object */
    formData.append("name", name);       /* this data is from the 'product' and we are inserting in the object in a form of key value pair  */
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData))  /* passing the final formData object to createProduct function  */
    
    navigate("/dashboard");  /* after creating navigate to the dashboard */
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
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

export default AddProduct;
