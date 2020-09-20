module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      finishedAt: {
        type: 'TIMESTAMP'
      },
      updatedAt: {
          type: 'TIMESTAMP',
          defaultValue: null
      }

    });
  
    return Todo;
  };
  