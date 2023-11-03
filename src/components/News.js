import React,{useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props)=> {
  
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async ()=> {
     props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${ props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(parsedData.loading)

    console.log(parsedData);
    
     props.setProgress(100);
  }

 useEffect(()=> {
  document.title = `${capitalizeFirstLetter( props.category)} - News7`
    updateNews();
  },[])


  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page+1}&pageSize=${ props.pageSize}`;
    setPage(page+1);
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     setArticles(articles.concat(parsedData.articles));
     setTotalResults(parsedData.totalResults);
  };

    return (
      <>
        <h2 className='text-center' style={{marginTop:'90px'}}>News7 - Top HeadLines from {capitalizeFirstLetter( props.category)}</h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.title}>
                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>

        </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
  country: "in",
  pageSize: 15,
  catagory: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  catagory: PropTypes.string
}

export default News
