module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Driver', {
        fullname: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        licenseCode: {
            type: DataTypes.ENUM('B', 'BA', 'C', 'D', 'E'),
            defaultValue: 'B',
        }
    }, {
        timestamps: false
    })
}