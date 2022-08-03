var express = require('express');
var router = express.Router();
const https = require('https');
let apiKey = require('../private/api.json');


/* GET recipes page. */
router.get('/', async function(req, res, next) {
  const param = req.query.param;
  const id = req.query.id;
  //const response = (ingredients === 'carrot') ? 'carrot' : 'not carrot';
  if(param === undefined && id === undefined) res.end();
    apiKey = apiKey.spooncular.key;
  
  if( id ){
    var query = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=' + apiKey;
  } else {
    var query = 'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=' + apiKey + '&query=' + param;
  }


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

    https.get( query, res => {
    
    let data = '';
    res.on('data', dataApi => data += dataApi );

    //not needed as it's going to turn into json at end but the data can be modified here
    res.on('end', () => { 

      if( res.statusCode === 200){

        data = JSON.parse(data);
        
          if(data.results === undefined){
            var container = prepareData(data, true);

          }else{
            var container = data.results.map( (recipe) => { return prepareData(recipe)} );
          }
        
        data = container;

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
