let DataTypes = require("sequelize").DataTypes;
let _txtmsg = require("./txtmsg");
function initModels(sequelize) {
  var txtmsg = _txtmsg(sequelize, DataTypes);

  return {
    txtmsg,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
