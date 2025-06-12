//https://kingchazy.github.io/CSCE242/projects/part5/js/json.js

// This code gets and shows property listings from a JSON file
// It puts the listings on the portfolio.html page in the listings area
// Each property shows: name, cost, details, and picture

const getListings = async() => {
    const url = "https://kingchazy.github.io/CSCE242/projects/part5/js/listings.json";

    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const showListings = async() => {
    const properties = await getListings();
    const listings = document.querySelector("#the-listings");

    properties.forEach((property) => {
        const article = document.createElement("article");
        article.className = "news-article";
        listings.append(article);

        const imageDiv = document.createElement("div");
        imageDiv.className = "article-image";
        const img = document.createElement("img");
        img.src = property.img_name;
        img.alt = property.title;
        imageDiv.append(img);
        article.append(imageDiv);

        const contentDiv = document.createElement("div");
        contentDiv.className = "article-div";
        article.append(contentDiv);

        const mDiv = document.createElement("div");
        mDiv.className = "article";
        const category = document.createElement("span");
        category.className = "category";
        category.innerHTML = property.property_type;
        const price = document.createElement("span");
        price.className = "price";
        price.innerHTML = property.price;
        mDiv.append(category, price);
        contentDiv.append(mDiv);

        const h2 = document.createElement("h2");
        h2.innerHTML = property.title;
        contentDiv.append(h2);

        const p = document.createElement("p");
        p.innerHTML = property.description;
        contentDiv.append(p);

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "property-details";
        
        const addressP = document.createElement("p");
        addressP.innerHTML = `<strong>Address:</strong> ${property.address}`;
        detailsDiv.append(addressP);

        const roomsP = document.createElement("p");
        roomsP.innerHTML = `<strong>Bedrooms:</strong> ${property.bedrooms} & <strong>Bathrooms:</strong> ${property.bathrooms}`;
        detailsDiv.append(roomsP);

        const sqftP = document.createElement("p");
        sqftP.innerHTML = `<strong>Square Feet:</strong> ${property.square_feet}`;
        detailsDiv.append(sqftP);

        const yearP = document.createElement("p");
        yearP.innerHTML = `<strong>Year Built:</strong> ${property.year_built}`;
        detailsDiv.append(yearP);

        const featuresP = document.createElement("p");
        featuresP.innerHTML = `<strong>Features:</strong> ${property.features.join(", ")}`;
        detailsDiv.append(featuresP);

        contentDiv.append(detailsDiv);
    });
};

showListings();