const Result = ({handleSingleRecipe, id, title, image, summary, healthScore, readyInMinutes, servings}) => {

    let summaryArray = summary.split(' ');
    if( summaryArray.length >= 50 ){
        summaryArray = summaryArray.slice(0,50);
        summary = summaryArray.join(' ') + '...';
    }

    return ( 
        <div className="result-item cols">
             <div className="card m-2">
                <img src={image} alt='' className="card-img-top img-thumbnail"/>
                <div className="tags card-img-overlay" onClick={(e)=>{handleSingleRecipe(e, id)}}>
                    <span className="badge">Health Score: {healthScore}</span>
                    <span className="badge">Ready in: {readyInMinutes} min</span>
                </div>
                <div  className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-text">{summary}</p>
                </div>
            </div>
           

        </div>
     );
}

export default Result;