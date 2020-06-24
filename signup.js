module.exports = function(app,mongoDbUrl, MongoClient, ObjectId){
    app.post('/signup',(req,res) => {
        var userSignUpInput = req.body;
        console.log(userSignUpInput);
        MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true }, (err, db) => {
            if (err) { console.log('mongoDb server not conected',err) }
        
            console.log("mongoDb connected successfully to server for login");
            var dbName = db.db('covidcare');
            
            dbName.collection("users").insertOne(userSignUpInput, function(err, res) {
               // if (err) throw err;
               // console.log("1 user successfully added");

               if (err){
                console.log(err);
                res.send(JSON.stringify("false user"));
            }else if (result[0] === undefined){
                console.log("Invalid register");
                res.send(JSON.stringify("Invalid register"));
            }else if (result==="new user"){
                console.log(result);
               // db.users.save(Email:'this.Email',password:'this.password');
                res.send(JSON.stringify("new user"));
            };
                db.close();
            });
        });

    });
};
        