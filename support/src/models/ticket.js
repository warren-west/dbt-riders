module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        openTime: {
            type: DataTypes.DATE,
            allowNull: false,
            default: DataTypes.NOW
        },
        closeTime: {
            type: DataTypes.DATE,
        },
        isSolved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // the "unlinked" foreign key
        // customers are handled by another database
        CustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
    })
}