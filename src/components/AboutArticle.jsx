import { Link } from "react-router-dom";

const AboutArticle = ({
  image,
  alt,
  category,
  title,
  description,
  linkTo,
  linkText,
}) => {
  return (
    <article className="news-article">
      <div className="article-image">
        <img src={image} alt={alt} />
      </div>
      <div className="article-div">
        <div className="article">
          <span className="category">{category}</span>
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={linkTo} className="read-more">
          {linkText}
        </Link>
      </div>
    </article>
  );
};

export default AboutArticle;
