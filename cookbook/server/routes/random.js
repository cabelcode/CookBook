var express = require('express');
var router = express.Router();
const https = require('https');
let apiKey = require('../private/api.json');



/* GET recipes page. */
router.get('/', async function(req, res, next) {
  apiKey = apiKey.spooncular.key;
  //should be own component
  const prepareData = (recipe, single) => {
    if( single ){
      return recipe;
    }
    var obj = {};
    const keys = ['id', 'title', 'image', 'summary', 'healthScore', 'readyInMinutes', 'servings'];
    keys.forEach(( key ) => {
      // if string check then remove html tags if any
        obj[key] = (typeof recipe[key] === 'string') ? recipe[key].replace(/<\/?[^>]+>/gi, '') : recipe[key];
    })

    return obj;
  }


  const response = await new Promise( ( resolve, reject ) =>{

    https.get('https://api.spoonacular.com/recipes/random?apiKey=' + apiKey, res => {
    
    let data = '';
    res.on('data', dataApi => data += dataApi );

    //not needed as it's going to turn into json at end but the data can be modified here
    res.on('end', () => { 

      if( res.statusCode === 200){

        data = JSON.parse(data);
        data = prepareData(data.recipes[0], true);


      }else{
        data = {status: 'failure'};
      }
      resolve( data )

    } ); 

    res.on('error', (er) => {} );
  
    } )
  } )

  res.send( JSON.stringify({ results:response }) );

});

module.exports = router;

/* var container = data.recipes.map( (recipe) =>{
  var obj = {};
  const keys = ['id', 'title', 'image', 'summary', 'healthScore', 'readyInMinutes', 'servings'];
  keys.forEach(( key ) => {
    // if string check then remove html tags if any
      obj[key] = (typeof recipe[key] === 'string') ? recipe[key].replace(/<\/?[^>]+>/gi, '') : recipe[key];
  })
  return obj;
} )   */