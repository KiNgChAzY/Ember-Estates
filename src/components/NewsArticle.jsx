import { Link } from 'react-router-dom';

const NewsArticle = (props) => {
    return (
        <article className="news-article">
            <div className="article-image">
                <img src={props.image} alt={props.alt} />
            </div>
            <div className="article-div">
                <div className="article">
                    {props.date && <span className="date">{props.date}</span>}
                    <span className="category">{props.category}</span>
                </div>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                {props.linkTo ? (
                    <Link to={props.linkTo} className="read-more">{props.linkText}</Link>
                ) : (
                    <button className="read-more">{props.linkText}</button>
                )}
            </div>
        </article>
    );
};

export default NewsArticle; 