const express = require('express'),
cors = require('cors'),
path = require('path'),
bodyParser = require('body-parser'),
pool = require('./DB');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist/angular7crud')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'../dist/angular7crud','index.html'))
});


app.get('/shipments', (req, res)=> {

  pool.query(`SELECT * FROM shipments_data order by new_shipment_id asc`)
    .then((dbres) => {
      // console.log('Result: ',dbres.rows);
      // pool.end();
      var rows = dbres.rows;

      var resObj = {
        "name": rows[0].source_id,
        "children": []
      };
      for(var i = 0, j =0; i < rows.length; i++){
        if(i < 1 || rows[i].new_shipment_id != rows[i-1].new_shipment_id){
        resObj.children.push({
          "name": rows[i].new_shipment_id,
          "value": rows[i].new_weight,
          "children": []
        })
        
        j++;
      }
      if(j > 0)
        resObj.children[j-1].children.push({
          "name": rows[i].shipment_id,
          "value": rows[i].weight,
        })
        
      }
      res.send(resObj);
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
      res.send({});
    });


});


const port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log('Listening on port ' + port);
});