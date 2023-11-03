import React from 'react'

const NewsItem =(props)=>{

    let {title,description,imgUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-5'>
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
           {source} 
          </span>
        <img src={!imgUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png":imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By:{!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-primary">Read More</a>
         </div>
      </div>
      </div>
    )
  
}

export default NewsItem
