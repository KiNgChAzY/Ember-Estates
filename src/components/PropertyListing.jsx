import { useState } from "react";
import "../css/dialog.css";
import EditPropertyForm from "./EditPropertyForm";
import DeleteProperty from "./DeleteProperty";

const PropertyListing = (props) => {
  const [property, setProperty] = useState(props);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showProperty, setShowProperty] = useState(true);

  const getImagePath = (imgName) => {
    //mozilla.org/en-US/docs/Web/API/File_API/
    if (imgName && imgName.startsWith("images/")) {
      return imgName;
    }
    if (imgName) {
      return `https://ember-estates-backend1.onrender.com/images/${imgName}`;
    }
    return "images/default-property.jpg";
  };

  const openPropertyDialog = (event) => {
    event.preventDefault();
    setShowPropertyDialog(true);
  };

  const closePropertyDialog = () => {
    setShowPropertyDialog(false);
  };

  const openEditDialog = (e) => {
    e.preventDefault();
    setShowPropertyDialog(false);
    setShowEditDialog(true);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
  };

  const openDeleteDialog = (e) => {
    e.preventDefault();
    setShowPropertyDialog(false);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const editProperty = (property) => {
    setProperty(property);
  };

  const hideProperty = () => {
    setShowProperty(false);
  };

  return (
    <>
      {showProperty ? (
        <a id="property-link" href="#" onClick={openPropertyDialog}>
          <article className="news-article">
            <div className="article-image">
              <img src={getImagePath(property.img_name)} alt={property.title} />
            </div>
            <div className="article-div">
              <div className="article">
                <span className="category">{property.property_type}</span>
                <span className="price">{property.price}</span>
              </div>
              <h2>{property.title}</h2>
              <p>{property.description}</p>

              <div className="property-details">
                <p>
                  <strong>Address:</strong> {property.address}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms} &{" "}
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Square Feet:</strong> {property.square_feet}
                </p>
                <p>
                  <strong>Year Built:</strong> {property.year_built}
                </p>
                <p>
                  <strong>Features:</strong> {property.features.join(", ")}
                </p>
              </div>
            </div>
          </article>
        </a>
      ) : (
        ""
      )}

      {showPropertyDialog ? (
        <div id="add-dialog" className="w3-modal dialog">
          <div className="w3-modal-content">
            <div className="w3-container">
              <span
                id="dialog-close"
                onClick={closePropertyDialog}
                className="w3-button w3-display-topright"
              >
                &times;
              </span>
              <div id="display-info" className="columns">
                <img
                  src={getImagePath(property.img_name)}
                  alt={property.title}
                />
                <div>
                  <div className="columns">
                    <h3>{property.title}</h3>
                    <section id="edit-links">
                      <a href="edit-link" onClick={openEditDialog}>
                        &#9998;
                      </a>
                      <a href="delete-link" onClick={openDeleteDialog}>
                        &#x2715;
                      </a>
                    </section>
                  </div>
                  <div className="article">
                    <span className="category">{property.property_type}</span>
                    <span className="price">{property.price}</span>
                  </div>
                  <p>{property.description}</p>
                  <div className="property-details">
                    <p>
                      <strong>Address:</strong> {property.address}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {property.bedrooms} &{" "}
                      <strong>Bathrooms:</strong> {property.bathrooms}
                    </p>
                    <p>
                      <strong>Square Feet:</strong> {property.square_feet}
                    </p>
                    <p>
                      <strong>Year Built:</strong> {property.year_built}
                    </p>
                    <p>
                      <strong>Features:</strong> {property.features.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showEditDialog ? (
        <EditPropertyForm
          _id={property._id}
          title={property.title}
          price={property.price}
          address={property.address}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          square_feet={property.square_feet}
          property_type={property.property_type}
          year_built={property.year_built}
          features={property.features}
          img_name={property.img_name}
          description={property.description}
          closeEditDialog={closeEditDialog}
          editProperty={editProperty}
        />
      ) : (
        ""
      )}

      {showDeleteDialog ? (
        <DeleteProperty
          title={property.title}
          _id={property._id}
          closeDeleteDialog={closeDeleteDialog}
          hideProperty={hideProperty}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PropertyListing;
