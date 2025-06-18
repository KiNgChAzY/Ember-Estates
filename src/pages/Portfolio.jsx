import "../css/portfolio.css";
import PortfolioArticle from "../components/PortfolioArticle";
import PropertyListing from "../components/PropertyListing";
import AddPropertyForm from "../components/AddPropertyForm";
import { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadListings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://ember-estates-backend1.onrender.com/api/listings");
      setListings(response.data);
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const updateListings = (newProperty) => {
    setListings((listings) => [...listings, newProperty]);
  };

  const editProperty = (updatedProperty) => {
    setListings((listings) => 
      listings.map((listing) => 
        listing._id === updatedProperty._id ? updatedProperty : listing
      )
    );
  };

  const deleteProperty = (propertyId) => {
    setListings((listings) => 
      listings.filter((listing) => listing._id !== propertyId)
    );
  };

  return (
    <main>
      <div className="container">
        <section className="news-content">
          <div className="news-header">
            <h1>Our Portfolio</h1>
            <p>
              Explore our diverse range of real estate projects, from luxury
              residential properties to commercial developments. Each project
              represents our commitment to quality, innovation, and client
              satisfaction.
            </p>
          </div>

          <div className="portfolio-grid">
            <PortfolioArticle
              image="images/Downtown Office Complex.jpg"
              alt="Commercial Development"
              category="Commercial"
              title="Downtown Office Complex"
              description="A state-of-the-art office complex featuring modern amenities, sustainable design, and flexible workspaces. This project showcases our expertise in commercial real estate development."
              linkTo="/news"
              linkText="View Details"
            />
            <PortfolioArticle
              image="images/Luxury Apartment Complex.jpg"
              alt="Residential Development"
              category="Residential"
              title="Luxury Apartment Complex"
              description="An upscale residential development offering premium living spaces with panoramic views, community amenities, and sustainable features. Perfect for modern urban living."
              linkTo="/about"
              linkText="Learn More"
            />
          </div>
          <div id="spacer"></div>

          <div className="news-header featured-listings">
            <div>
              <h1>Featured Listings</h1>
              <p>
                Explore our current selection of premium properties available for
                purchase or lease.
              </p>
            </div>
            <AddPropertyForm updateListings={updateListings} />
          </div>
          
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p>Loading listings...</p>
            </div>
          ) : (
            <div className="portfolio-grid" id="the-listings">
              {listings.map((listing) => (
                <PropertyListing
                  key={listing._id}
                  _id={listing._id}
                  title={listing.title}
                  price={listing.price}
                  address={listing.address}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  square_feet={listing.square_feet}
                  property_type={listing.property_type}
                  year_built={listing.year_built}
                  features={listing.features}
                  img_name={listing.img_name}
                  description={listing.description}
                  editProperty={editProperty}
                  deleteProperty={deleteProperty}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Portfolio;
