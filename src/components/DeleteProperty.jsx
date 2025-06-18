import "../css/dialog.css";
import React, { useState } from "react";

const DeleteProperty = (props) => {
  const [result, setResult] = useState("");

  const deleteProperty = async() => {
    const response = await fetch(`https://ember-estates-backend1.onrender.com/api/listings/${props._id}`, {
      method:"DELETE"
    });

    if(response.status === 200) {
      setResult("Property successfully deleted");
      props.closeDeleteDialog();
      props.hideProperty();
    } else {
      setResult("Sorry, we couldn't delete the property");
    }
  };

  return (
    <div id="delete-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick = {props.closeDeleteDialog}
          >
            &times;
          </span>
          <div id="delete-content">
            <h3>Are you sure you want to delete {props.title}?</h3>
            <section>
              <button onClick = {props.closeDeleteDialog}>No</button>            
              <button onClick={deleteProperty}>Yes</button>
            </section>
            <span>{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProperty; 