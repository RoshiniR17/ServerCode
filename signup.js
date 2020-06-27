const User = require("./model/User");

module.exports = function(app,mongoDbUrl, MongoClient, ObjectId){
    app.post('/signup',(req,res) => {
        var userSignUpInput = req.body;
       
        MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true }, (err, db) => {
            if (err) { console.log('mongoDb server not conected',err) }
        
            console.log("mongoDb connected successfully to server for login");
            var dbName = db.db('covidcare');
            console.log("connected");
       
            dbName.collection("users").insertOne(userSignUpInput, function(err, result) 
            {
               
               
               if (err)res.send(JSON.stringify("invalid registration")) ;
               else if(userSignUpInput.Email===undefined || userSignUpInput.password===undefined || userSignUpInput.firstName===undefined||userSignUpInput.lastName===undefined)
               {
                   res.send(JSON.stringify("null"));
               }

                     
           else{
                   
                   
                    res.send(JSON.stringify("new user"));
                    
                
    
                };
                db.close();
               
               
               
               
            
            });
          
            
        });
      

    });
};
        