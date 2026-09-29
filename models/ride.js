module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Ride', {
        rideId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        endTime: {
            type: DataTypes.DATE,
        },
        distance: {
            type: DataTypes.DECIMAL(10,1),
        },
        price: {
            type: DataTypes.DECIMAL(10,1),
        },
        rideState: {
            type: DataTypes.ENUM('IN_PROGRESS', 'COMPLETED', 'CANCELED'),
            allowNull: false,
            defaultValue: 'IN_PROGRESS'
        }
    }, {
        timestamps: false
    })
}