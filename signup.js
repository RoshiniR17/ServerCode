module.exports = function(app,mongoDbUrl, MongoClient, ObjectId){
    app.post('/signup',(req,res) => {
        var userSignUpInput = req.body;
        console.log(userSignUpInput);
        MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true }, (err, db) => {
            if (err) { console.log('mongoDb server not conected',err) }
        
            console.log("mongoDb connected successfully to server for login");
            var dbName = db.db('covidcare');
            console.log("connected");
            var name={
                "firstName": "roshini",
                "lastName": "r",
                "Username": "rose@123",
                "Email": "rose@gmail.com",
                "password": "crazyus"};
            dbName.collection("users").insertOne(name, function(err, result) 
            {
                
               //if (err) throw err;
              /*  console.log("1 user successfully added",res.ops);
                res.send(JSON.stringify("yea working"));*/
               
               if (err){
                console.log(err);
                res.send(JSON.stringify("Invaid  registration"));
                     }
              else{
                res.send(JSON.stringify("new user"));
                };
               
               
               // db.users.save(Email:'this.Email',password:'this.password');
               
            
            
            });
            db.close();
        });

    });
};
        