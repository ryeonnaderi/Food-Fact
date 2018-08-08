module.exports = function (sequelize, DataTypes) {
    var Food = sequelize.define("Food", {
        ds: DataTypes.STRING,
        group: DataTypes.STRING,
        manu: DataTypes.STRING,
        name: DataTypes.STRING,
        ndbno: DataTypes.STRING
    });
    return Food;
}
