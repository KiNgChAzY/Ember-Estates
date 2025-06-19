import "../css/dialog.css";
import React, { useState } from "react";

const EditHousePlan = (props) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState("http://localhost:3001/images/" + props.main_image);

  const uploadImage = (event) => {
    setPrevSrc(URL.createObjectURL(event.target.files[0]));
};

  const onSubmit = async(event) => {
    event.preventDefault();
    setResult("... sending");

    const formData = new FormData(event.target);
    console.log(...formData);

    const response = await fetch(`http://localhost:3001/api/houses/${props._id}`,{
      method:"PUT",
      body:formData
    });

    if(response.status === 200) {
      setResult("House updated successfully");
      event.target.reset();
      props.closeEditDialog();
      props.editHousePlan(await response.json());
    } else {
      setResult("Error edditing house");
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
            <p>
              <label htmlFor="name ">Property Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={props.name}
                required
              />
            </p>
            <p>
              <label htmlFor="size">Size:</label>
              <input
                type="number"
                id="size"
                name="size"
                defaultValue={props.size}
                required
              />
            </p>
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

            <section className="columns">
                    <div>
                        <p id="img-prev-section">
                            {prevSrc!=""?
                            (<img id="img-prev" src={prevSrc}></img>):
                            ("")
                            }
                        </p>
                    </div>
                    <p id="img-upload">
                        <label htmlFor="img">Upload Image:</label>
                        <input type="file" id="img" name="img" accept="image/*" onChange={uploadImage} />
                    </p>
                </section>
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

export default EditHousePlan;