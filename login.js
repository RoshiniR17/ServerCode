module.exports = function(app,mongoDbUrl, MongoClient){
    app.post('/login',(req,res) => {
        var userLoginInput = req.body;
        console.log(userLoginInput);
        res.send(JSON.stringify(["Server: I get the data which you send",userLoginInput]));
    })
}
