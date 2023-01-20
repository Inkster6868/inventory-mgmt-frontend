import React from "react";
import ReactQuill from "react-quill";    /* this"react-quill" package  helps us to create a rich/good looking text editor */
import "react-quill/dist/quill.snow.css";
import Card from "../../Card/Card";
import "../productForm/ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange, 
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>                         {/* we want to have a card like effect around the form so we use this   */}
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
                                                    {/* if the user has uploaded a image so that will be converted into a URL that we can render, if the image is there then preview it, else say no image uploaded */}
            {imagePreview != null ? (        
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>

          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}                                 
            onChange={handleInputChange}   
          />

{/* product?.name--> here we are using optional chaining that if the product.name exists then show name or do not show anything, if we would normally write product.category and it didnt existed it would throw an error */}
          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>         {/* this is being created through react-quills */}
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}    written below
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {                 /* hre we have exported everything after destructuurijg */
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",                                   /* all thse format appear on the test edito */
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
