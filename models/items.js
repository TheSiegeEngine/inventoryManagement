'use strict';
module.exports = (sequelize, DataTypes) => {
    const items = sequelize.define(
        'items',
        {
            name: DataTypes.STRING,
            price: DataTypes.FLOAT(2),
            quantity: DataTypes.INTEGER
        },
        {}
    );
    items.associate = function(models) {
        // associations can be defined here
    };
    return items;
};
