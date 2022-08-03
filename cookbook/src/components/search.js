import React from "react";

const SearchComponent = ({textInput, searchBtn, randomBtn}) => { 
    return(
    <div className='no-nav search text-center vh-100 d-flex flex-column justify-content-center'>
        <form className=''>
            <label className='form-label mx-auto'><h1 className="logo">cook<span>book</span></h1></label>
            <div className="mb-4">{textInput}</div>
            <span className="m-0 m-mb-3">{searchBtn}</span>
            <span className="m-3">{randomBtn}</span>
        </form>
    </div>);
 }

 const SearchNavComponent = ({textInput, searchBtn, randomBtn}) => { 
    return(
    <div className='search'>
        
        <form className='container-fluid d-md-flex justify-content-between p-2 p-md-3'>
            <div className="row mb-4 mb-md-0 mx-md-2 order-md-2 align-items-center">
                <div className="col d-flex justify-content-between justify-md-content-end">
                <h1 className="logo d-block m-0 lh-base d-md-none">cook<span>book</span></h1>
                {randomBtn}
                </div>
            </div>
            <div className="row my-2 m-md-0 order-md-1">
                <div className="col d-flex flex-center">
                <h1 className="logo m-2 d-none my-md-0 d-md-block">cook<span>book</span></h1>
                    <div className="input-group d-flex">
                        {textInput}
                        {searchBtn}
                    </div>
                </div>
            </div>
            
            
        </form>
    </div>);
 }


const Search = ({handleSubmit, handleChange, handleRandom, nav}) => {
        
    const formControl = {
        textInput: <input placeholder="Search Recipe" className='form-control search-input mx-auto' type="text" onChange={ (e) => {handleChange(e)} }></input>,
        searchBtn: <button className='btn search' onClick={ (e) => {handleSubmit(e)} }>Submit</button>,
        randomBtn: <button className='btn random' onClick={ (e) => {handleRandom(e)} }>Random</button>
    }
    return ( 
        <React.Fragment>
            {
                nav ? <SearchNavComponent {...formControl}/> : <SearchComponent {...formControl}/>
            }
        </React.Fragment>
     );
}

export default Search;
