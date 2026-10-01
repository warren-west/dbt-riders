module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Employee', {
        fullname: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
    }, {
        timestamps: false,
    })
}