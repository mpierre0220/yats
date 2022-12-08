const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('txtmsg', {
    message: {
      type: DataTypes.STRING(4096),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    msgid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'txtmsg',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "msgid" },
          { name: "userid" },
        ]
      },
    ]
  });
};
