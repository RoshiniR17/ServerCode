module.exports = function(app,mongoDbUrl, MongoClient){
    app.post('/login',(req,res) => {
        var userLoginInput = req.body;
        console.log(userLoginInput);
        //res.send(JSON.stringify(["Server: I get the data which you send",userLoginInput]));
        MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true }, (err, allDb) => {
            if (err) { console.log('mongoDb server not conected',err) }
        
            console.log("mongoDb connected successfully to server for login");
            var db = allDb.db('covidCare');//db name

            db.collection("userData").find(userLoginInput).toArray(function(err, result) {
                if (err){
                    console.log(err);
                    res.send(JSON.stringify("false user"));
                }else if (result[0] === undefined){
                    console.log("false user");
                    res.send(JSON.stringify("false user"));
                }else{
                    console.log(result);
                    res.send(JSON.stringify("true user"));
                };
                allDb.close();
            });
        });
    })
}
