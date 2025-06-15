const PropertyListing = (props) => {
    const getImagePath = (imgName) => { //mozilla.org/en-US/docs/Web/API/File_API/
        if (imgName && imgName.startsWith("images/")) {
            return imgName;
        }
        if (imgName) {
            return `images/${imgName}`;
        }
        return "images/default-property.jpg";
    };

    return (
        <article className="news-article">
            <div className="article-image">
                <img src={getImagePath(props.img_name)} alt={props.title} />
            </div>
            <div className="article-div">
                <div className="article">
                    <span className="category">{props.property_type}</span>
                    <span className="price">{props.price}</span>
                </div>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                
                <div className="property-details">
                    <p><strong>Address:</strong> {props.address}</p>
                    <p><strong>Bedrooms:</strong> {props.bedrooms} & <strong>Bathrooms:</strong> {props.bathrooms}</p>
                    <p><strong>Square Feet:</strong> {props.square_feet}</p>
                    <p><strong>Year Built:</strong> {props.year_built}</p>
                    <p><strong>Features:</strong> {props.features.join(", ")}</p>
                </div>
            </div>
        </article>
    );
};

export default PropertyListing; 