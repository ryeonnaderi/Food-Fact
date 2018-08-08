var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT  = process.env.PORT || 8080;

var db = require("./models");

app.use(express.static("public"));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function(){
    app.listen(PORT,function(){
        console.log("app is listening on port" + PORT);
    });
});

