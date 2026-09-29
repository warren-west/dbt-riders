module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}