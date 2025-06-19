import "../css/dialog.css";
import React, { useState } from "react";

const DeleteProperty = (props) => {
  const [result, setResult] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProperty = async () => {
    setIsDeleting(true);
    setResult("Deleting...");
    try {
      const response = await fetch(
        `https://ember-estates-backend1.onrender.com/api/listings/${props._id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setResult("Property successfully deleted");
        setTimeout(() => {
          props.closeDeleteDialog();
          props.hideProperty();
          if (props.onDeleteSuccess) props.onDeleteSuccess(props._id);
        }, 1000);
      } else {
        const errorText = await response.text();
        setResult(`Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setResult("Network error - please check your connection");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div id="delete-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeDeleteDialog}
          >
            &times;
          </span>
          <div id="delete-content">
            <h3>Are you sure you want to delete the {props.title}?</h3>
            <section>
              <button onClick={props.closeDeleteDialog} disabled={isDeleting}>
                No
              </button>
              <button onClick={deleteProperty} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
            </section>
            <span>{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProperty; 