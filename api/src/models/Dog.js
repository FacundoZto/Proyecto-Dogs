const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        max: 300,
      }
    },
    weight: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        max: 300,
      }
    },
    life_span: {
      type: DataTypes.STRING(20),
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, 
  {
    timestamps: false
  });
};
