import {useState} from "react";
import "../css/dialog.css";
import EditHousePlan from "./EditHousePlan";
import DeleteHousePlan from "./DeleteHousePlan";

const HousePlan = (props) => {
    const [housePlan, setHousePlan] = useState(props);
    const [showHousePlanDialog, setShowHousePlanDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showHousePlan, setShowHousePlan] = useState(true);

    const openHousePlanDialog = (event) => {
        event.preventDefault();
        setShowHousePlanDialog(true);
    }

    const closeHousePlanDialog = () => {
        setShowHousePlanDialog(false);
    }

    const openEditDialog = (e) => {
        e.preventDefault();
        setShowHousePlanDialog(false);
        setShowEditDialog(true);
      };
    
      const closeEditDialog = () => {
        setShowEditDialog(false);
      };

      const openDeleteDialog = (e) => {
        e.preventDefault();
        setShowHousePlanDialog(false);
        setShowDeleteDialog(true);
      };
    
      const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
      };
    
      const editHousePlan = (house) => {
        setHousePlan(house);
      };

      const hideHousePlan = () => {
        setShowHousePlan(false);
      };

    return (
        <>
            {showHousePlan?(
                <a id="house-plan-link" href="#" onClick={openHousePlanDialog}>
                    <div className="house-plan columns">
                        <div className="house-image">
                            <img src={"http://localhost:3001/images/" + housePlan.main_image} />
                        </div>
                        <div className="house-description">
                            <h1>{housePlan.name}</h1>
                            <p>Size: {housePlan.size}</p>
                            <p>Bedrooms: {housePlan.bedrooms}</p>
                            <p>Bathrooms: {housePlan.bathrooms}</p>
                        </div>
                    </div>
                </a>
            ):("")}

            {showHousePlanDialog?(
                <div id="add-dialog" className="w3-modal dialog">
                    <div className="w3-modal-content">
                        <div className="w3-container">
                            <span id="dialog-close" onClick={closeHousePlanDialog} className="w3-button w3-display-topright">&times;</span>
                            <div id="display-info" className="columns">
                                <img src={"http://localhost:3001/images/" + housePlan.main_image} />
                                <div>
                                    <div  className="columns">
                                        <h3>{housePlan.name}</h3>
                                        <section id="edit-links">
                                            <a href="edit-link" onClick={openEditDialog}>&#9998;</a>
                                            <a href="delete-link" onClick={openDeleteDialog}>&#x2715;</a>
                                        </section>
                                    </div>
                                    <p>Size: {housePlan.size}</p>
                                    <p>Bedrooms: {housePlan.bedrooms}</p>
                                    <p>Bathrooms: {housePlan.bathrooms}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ) : ("")}

            {showEditDialog?(
                <EditHousePlan
                    _id={housePlan._id}
                    name={housePlan.name}
                    size={housePlan.size}
                    main_image={housePlan.main_image}
                    bedrooms={housePlan.bedrooms}
                    bathrooms={housePlan.bathrooms}
                    closeEditDialog = {closeEditDialog}
                    editHousePlan = {editHousePlan} />
            ) : ("")}

            {showDeleteDialog?(
                <DeleteHousePlan
                name={housePlan.name}
                _id={housePlan._id}
                closeDeleteDialog = {closeDeleteDialog}
                hideHousePlan = {hideHousePlan}
                />
            ):("")}
        </>
    );
}

export default HousePlan;