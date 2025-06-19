import "../css/dialog.css";
import React, { useState } from "react";

const EditPropertyForm = (props) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState("https://ember-estates-backend1.onrender.com/api/listings/images/" + props.img_name);

  const uploadImage = (event) => {
    setPrevSrc(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    setResult("... sending");

    const formData = new FormData(event.target);
    console.log(...formData);
    
    const response = await fetch(`https://ember-estates-backend1.onrender.com/api/listings/${props._id}`, {
      method: "PUT",
      body: formData
    });

    if (response.status === 200) {
      setResult("Property updated successfully");
      event.target.reset();
      props.closeEditDialog();
      props.editProperty(await response.json());
    } else {
      setResult("Error editing property");
    }
  };

  return (
    <div id="edit-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeEditDialog}
          >
            &times;
          </span>
          <form id="edit-property-form" onSubmit={onSubmit}>
            <h3>Edit Property</h3>
            
            <p>
              <label htmlFor="title">Property Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={props.title}
                required
              />
            </p>

            <p>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={props.price ? props.price.replace(/[$,]/g, '') : ''}
                required
              />
            </p>

            <p>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={props.address}
                required
              /> 
            </p>

            <section className="columns">
              <div>
                <p>
                  <label htmlFor="bedrooms">Bedrooms:</label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    defaultValue={props.bedrooms}
                    required
                  />
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="bathrooms">Bathrooms:</label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    defaultValue={props.bathrooms}
                    required
                  />
                </p>
              </div>
            </section>

            <p>
              <label htmlFor="square_feet">Square Feet:</label>
              <input
                type="number"
                id="square_feet"
                name="square_feet"
                defaultValue={props.square_feet}
                required
              />
            </p>

            <p>
              <label htmlFor="property_type">Property Type:</label>
              <select id="property_type" name="property_type" defaultValue={props.property_type} required>
                <option value="">Select property type</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </p>

            <p>
              <label htmlFor="year_built">Year Built:</label>
              <input
                type="number"
                id="year_built"
                name="year_built"
                defaultValue={props.year_built}
                required
              />
            </p>

            <section className="columns">
              <div>
                <p id="img-prev-section">
                  {prevSrc !== "" ? (
                    <img id="img-prev" src={prevSrc} alt="Preview" />
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <p id="img-upload">
                <label htmlFor="img">Upload Image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={uploadImage} />
              </p>
            </section>

            <p>
              <label htmlFor="features">Features:</label>
              <textarea 
                id="features" 
                name="features" 
                defaultValue={props.features ? props.features.join(", ") : ""}
              />
            </p>

            <p>
              <label htmlFor="description">Description:</label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={props.description}
                required 
              />
            </p>

            <p>
              <button type="submit">Submit</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyForm; 