const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        tail_length: { type: DataTypes.FLOAT, allowNull: false },
        weight: { type: DataTypes.FLOAT, allowNull: false },
    };

    return sequelize.define('Dog', attributes);
}
