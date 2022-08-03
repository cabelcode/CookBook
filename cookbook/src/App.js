import React, { Component } from 'react';
import './style.css';
import Search from './components/search';
import Result from './components/result';
import Single from './components/single';
import Modal from './components/modal';


class App extends Component {

  state = { 
    input:'',
    result:'',
    selectedRecipe:'',
    singleActive:false,
    modalActive:false,
    nav:false
  };

  getRecipes = async ({api,query}) =>{
    try{
      const request = query !== undefined ?  api + query : api;  
      const response = await fetch( request );
      let data = await response.json();
      if(response.ok && data.results.status !== 'failure'){
        
        //random recipe uses selectedRecipe state
        if(query === undefined){
          this.setState({selectedRecipe: data.results});
        }else{
          this.setState({result: data.results});
        }

      }else{
        this.setState({modalActive:true});
      }
    } catch (error) {

    }
  }
  //note: the componentDidUpdate sets the singleActive state to true 
  getSingleRecipe = async (id) => {
    try{
      const response = await fetch( `https://fetchcookbook.charlesabella.com/recipes?id=${id}` );
      let data = await response.json();
      if(response.ok){
        //this somehow sets an obj but it can't return obj, it only return promises 
        this.setState({selectedRecipe: data.results});
      }
    } catch (error) {
  
    }

  }

  handleSingleRecipe = (event, id) => {
    event.preventDefault();
    this.getSingleRecipe(id)
  }
  handleSubmit = (event) => {
    
    event.preventDefault();
    const query = this.state.input;
    const api = 'https://fetchcookbook.charlesabella.com/recipes?param='
    this.getRecipes({api, query});
  }

  handleRandom = (event) => {
    
    event.preventDefault();
    const api = 'https://fetchcookbook.charlesabella.com/random'
    this.getRecipes({api});
  }


  handleChange = (e) => {
      this.setState({input: e.target.value});
  }

  componentDidUpdate(prevProps, prevState){
    if( prevState.selectedRecipe !== this.state.selectedRecipe ){
      this.handleSingleActive(true);
    }
    if (prevState.result !== this.state.result ){
      this.setState({nav:true});
    }
  }

  handleSingleActive = (bool) => {
    this.setState({singleActive:bool})
  }

  render() { 
    const { result, selectedRecipe, singleActive, modalActive } = this.state;
    return (
        <div className='App d-flex flex-column'>
            <Search nav={this.state.nav} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleRandom={this.handleRandom} />
            <div className='result-container row row-cols-sm-2 row-cols-md-3'>
              { result ? result.map( (data, index) => <Result handleSingleRecipe={this.handleSingleRecipe} key={index} {...data} /> ) : <h2 className='noResult text-center'>No results</h2>}
            </div>
            <Single data={selectedRecipe} singleActive={ singleActive } handleSingleActive={ this.handleSingleActive }/>
           <Modal show={modalActive} setShow={(bool) => {this.setState({modalActive:bool})}} />
            
        </div>
    );
  }
}

export default App;
