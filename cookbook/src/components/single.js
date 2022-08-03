import { useState } from "react";
import useWindowDimensions from "./windowDimension";

const recipeDetailMobile = ({ingredients, method, slideContent, setSlideContent}) => {
    return(
        <div className="recipe-details">
            <div className="btn-group slide-btn-container">
                <button className={`btn ${ slideContent === 'ingredient' ? 'active' : '' }`} onClick={ ()=>{setSlideContent('ingredient')} }><h3>Ingredients</h3></button>
                <button className={`btn ${ slideContent === 'method' ? 'active' : '' }`} onClick={ ()=>{setSlideContent('method')} }><h3>Method</h3></button>
            </div>
            <div className='slide-container'>
                <div className={`slide ${slideContent}`}>
                    <div className="ingredients">
                        <ul className="list-group">
                            {ingredients}
                        </ul>

                    </div>
                    <div className="method">
                        <ul className="list-group">
                            {method}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const recipeDetailDesktop = ({ingredients,method, slideContent, setSlideContent}) => {
    return(
        <div className="recipe-details dsktp d-md-flex justify-content-center pt-4">
           <div className="card ingredients m-md-2">
                <h3 className="detail card-title text-center">Ingredient</h3>
                <ul className="list-group list-group-flush">
                    {ingredients}
                </ul>

            </div>
            <div className="card method m-md-2">
            <h3 className="detail card-title text-center">Method</h3>
                <ul className="list-group list-group-flush">
                    {method}
                </ul>
            </div>
        </div>
    );
}



const Single = ({data, handleSingleActive, singleActive}) => {
    var ingredients, method;
    const { width } = useWindowDimensions();
    const [slideContent, setSlideContent] = useState('ingredient');

    //TODO
    if(data){
        if (data.extendedIngredients.length > 0 ){
            ingredients = data.extendedIngredients && data.extendedIngredients.map( (val, index) => { 
                return <li key={index} className="list-group-item">{val.original}</li>
             } );
        }else{
            ingredients = <li className="list-group-item">Ingredients unavailable</li>
        }
        if(data.analyzedInstructions.length > 0){
            method = data.analyzedInstructions && data.analyzedInstructions[0].steps.map( (val, index) => { 
                return <li key={index} className="list-group-item">{ (index + 1) + ". " + val.step}</li>
             } );
        }else{
            method = <li className="list-group-item">Method unavailable</li>
        }
    }

    return ( 
        <div className={`single ${singleActive ? 'active': '' }`}>
            <button className="backBtnSingle" onClick={() => {handleSingleActive(false)} }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/>
                </svg>
            </button> 
            <h1 className="recipe-title">{data.title}</h1>

            <img src={data.image} alt='' className="img-fluid" />
            <div className="single-tags-container tags">
                    <span className="badge">Health Score: {data.healthScore}</span>
                    <span className="badge">Ready in: {data.readyInMinutes} min</span>
            </div>
            
            {width < 768 ? 
                recipeDetailMobile({ingredients, method, slideContent, setSlideContent}) : 
                recipeDetailDesktop({ingredients, method, slideContent, setSlideContent})
            }
            
        </div>
     );
}

export default Single;