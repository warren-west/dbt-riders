module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Customer', {
        fullname: {
            type: DataTypes.STRING(120),
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}