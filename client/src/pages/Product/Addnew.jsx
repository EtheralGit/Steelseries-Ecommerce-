// import npm file
import React, { useState } from "react";
// import code file
import useNew from "../../hooks/productHooks/useNew";

const Addnew = () => {
  const { loading, newProduct } = useNew();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    price: "",
    image: null,
    mainImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, mainImage: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newProduct(
      formData.title,
      formData.description,
      formData.type,
      formData.price,
      formData.image,
      formData.mainImage
    );
  };

  return (
    <div className="min-h-screen relative bg-secondary p-16 flex flex-col justify-center items-center ">
      <div className="w-3/5 ml-28 -mb-4">
        <h1 className="text-3xl text-start font-bold text-tertiary mb-8">
          Add New Product
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[90vh] flex justify-center items-center gap-8">
          <div className="w-[29rem] h-96 border-tertiry border rounded-lg flex justify-center items-center">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Selected file"
                className="max-w-full max-h-full"
              />
            ) : (
              <input
                type="file"
                className="file-input w-full max-w-[7.8rem] flex "
                name="file1"
                onChange={handleFileChange}
              />
            )}
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Product Name"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Product Description"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full h-[9.8vh]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <select
                  id="type"
                  name="type"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option
                    value=""
                    disabled
                    className="text-tertiary bg-secondary"
                  >
                    Select Type
                  </option>
                  <option
                    value="keyboard"
                    className="text-tertiary bg-secondary"
                  >
                    Keyboard
                  </option>
                  <option
                    value="headset"
                    className="text-tertiary bg-secondary"
                  >
                    Headset
                  </option>
                  <option
                    value="speaker"
                    className="text-tertiary bg-secondary"
                  >
                    Speaker
                  </option>
                  <option
                    value="microphone"
                    className="text-tertiary bg-secondary"
                  >
                    Microphone
                  </option>
                  <option value="mice" className="text-tertiary bg-secondary">
                    Mice
                  </option>
                </select>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Product Price"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full pl-8"
                  value={formData.price}
                  onChange={handleChange}
                />
                <span className="text-lg absolute top-3 left-4">$</span>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white font-bold w-36 h-12 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h1 className="text-center text-2xl text-white font-bold mt-12 mb-4">
        Main Product Image
      </h1>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleMainFileChange}
        name="file2"
      />
    </div>
  );
};

export default Addnew;
