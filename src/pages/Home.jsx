import '../css/home.css';
import HomeArticle from '../components/HomeArticle';

const Home = () => {
    return ( 
        <main>
            <div className="container">
                <div className="main-content">
                    <div className="news-header">
                        <h1>Welcome To Ember Estates</h1>
                    </div>
                    <div className="h-image">
                        <video autoPlay muted loop playsInline>
                            <source src={`${process.env.PUBLIC_URL}/images/8435-209066470_small.mp4`} type="video/mp4" />
                        </video>
                    </div>

                    <div className="news-grid">
                        <HomeArticle 
                            image={`${process.env.PUBLIC_URL}/images/work.jpg`}
                            alt="Latest Updates"
                            category="Latest Updates"
                            title="Market Insights"
                            description="Stay informed about the latest developments in the real estate market. Our expert analysis and insights help you make informed decisions about your property investments."
                            linkTo="/news"
                            linkText="Read More"
                        />
                        <HomeArticle 
                            image={`${process.env.PUBLIC_URL}/images/us.jpg`}
                            alt="Contact Information"
                            category="Get in Touch"
                            title="Contact Our Team"
                            description="Our experienced real estate professionals are here to help you find your perfect property. Reach out to us for personalized assistance and expert guidance."
                            linkTo="/contact"
                            linkText="Contact Us"
                        />
                        <HomeArticle 
                            image={`${process.env.PUBLIC_URL}/images/buildings.jpg`}
                            alt="Our Portfolio"
                            category="Our Work"
                            title="Featured Properties"
                            description="Explore our collection of premium properties, from luxury homes to commercial spaces. Each listing represents our commitment to quality and excellence."
                            linkTo="/portfolio"
                            linkText="View Portfolio"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;