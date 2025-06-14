const PropertyListing = (props) => {
    return (
        <article className="news-article">
            <div className="article-image">
                <img src={props.img_name} alt={props.title} />
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