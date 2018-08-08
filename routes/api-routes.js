var db = require("../models");
module.exports = function (app) {
    app.post("/api/USDA", function (req, res) {
        var foodItems = req.body.foods.map(function (food) {
            return {
                id: food.id,
                ds: food.ds,
                group: food.group,
                manu: food.manu,
                name: food.name,
                ndbno: food.ndbno
            };
        });
        db.Food.bulkCreate(foodItems).then(function (response) {
            res.json(response);
            console.log(response);
        });
    });

    app.get("/api/USDA", function (req, res) {
        db.Food.findAll({
        })
        .then(function(data){
            res.json(data);
        });
    });
}