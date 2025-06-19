import "../css/dialog.css";
import "../css/addproperty.css";
import { useState } from "react";

const AddPropertyForm = (props) => {
    const [result, setResult] = useState("");
    const [prevSrc, setPrevSrc] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);

    const uploadImage = (event) => {
        const file = event.target.files[0]; 
        if (file) { //mozilla.org/en-US/docs/Web/API/File_API/

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setResult("Error: select (JPEG, PNG, or WebP)");
                event.target.value = '';
                return;
            }
            setPrevSrc(URL.createObjectURL(file));
            setResult("");
        }
    };

    const openAddDialog = (event) => {
        event.preventDefault();
        setShowAddDialog(true);
    }

    const closeAddDialog = () => {
        setShowAddDialog(false);
    }

    const addProperty = async (event) => {
        event.preventDefault();
        
        setResult("... Sending");

        const formData = new FormData(event.target);
        
        const featuresString = formData.get("features") || ""; // wouldnt work without
        const featuresArray = featuresString
            .split(",")
            .map(feature => feature.trim())
            .filter(feature => feature.length > 0);
        formData.set("features", JSON.stringify(featuresArray));
        const price = formData.get("price");
        if (price) {
            formData.set("price", `$${parseFloat(price).toLocaleString()}`);
        }

        const response = await fetch("http://localhost:3001/api/listings", {
            method: "POST",
            body: formData
        });

        if (response.status === 200) {
            setResult("Property Added");
            event.target.reset();
            setPrevSrc("");
            closeAddDialog();
            props.updateListings(await response.json());
        } else {
            const errorMessage = await response.text();
            setResult(`Error: ${errorMessage}`);
        }
    }

    return (
        <div id="add-property-form">
            <a id="add-link" onClick={openAddDialog} href="#">+</a>

            {showAddDialog ? (
                <div id="add-dialog" className="w3-modal dialog">
                    <div className="w3-modal-content">
                        <div className="w3-container">
                            <span id="dialog-close" onClick={closeAddDialog} className="w3-button w3-display-topright">&times;</span>
                            <form id="add-property-form" onSubmit={addProperty}>
                                <h3>Create New Property</h3>

                                <p>
                                    <label htmlFor="title">Property Title:</label>
                                    <input type="text" id="title" name="title" required min="3"></input>
                                </p>

                                <p>
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" id="price" name="price" min="0" step="0.01" required></input>
                                </p>

                                <p>
                                    <label htmlFor="address">Address:</label>
                                    <input type="text" id="address" name="address" required></input>
                                </p>

                                <section className="columns">
                                    <div>
                                        <p>
                                            <label htmlFor="bedrooms">Bedrooms:</label>
                                            <input type="number" id="bedrooms" name="bedrooms" min="0" required></input>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <label htmlFor="bathrooms">Bathrooms:</label>
                                            <input type="number" id="bathrooms" name="bathrooms" min="0" step="0.5" required></input>
                                        </p>
                                    </div>
                                </section>

                                <p>
                                    <label htmlFor="square_feet">Square Feet:</label>
                                    <input type="number" id="square_feet" name="square_feet" min="1" required></input>
                                </p>

                                <p>
                                    <label htmlFor="property_type">Property Type:</label>
                                    <select id="property_type" name="property_type" required>
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
                                    <input type="number" id="year_built" name="year_built" min="1800" max={new Date().getFullYear()} required></input>
                                </p>

                                <section className="columns">
                                    <p id="img-upload">
                                        <label htmlFor="img">Upload Image:</label>
                                        <input 
                                            type="file" 
                                            id="img" 
                                            name="img" 
                                            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
                                            onChange={uploadImage} 
                                        />
                                    </p>
                                </section>

                                <p>
                                    <label htmlFor="features">Features:</label>
                                    <textarea id="features" name="features" placeholder="Enter features (e.g., Pool, Garage, Fireplace) "></textarea>
                                </p>

                                <p>
                                    <label htmlFor="description">Description:</label>
                                    <textarea id="description" name="description" required rows="4"></textarea>
                                </p>

                                <p>
                                    <button type="submit">Submit</button>
                                </p>
                                <p>{result}</p>
                            </form>
                        </div>
                    </div>
                </div>
            ) : ("")}
        </div>
    );
}

export default AddPropertyForm; 