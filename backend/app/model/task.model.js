module.exports = (sequelize, Sequelize) => {
	var Task = sequelize.define(
		"task",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			todo_id:{
				type: Sequelize.INTEGER,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			important: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			done: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			}
		});
	
	Task.associate = (models) => {
		Task.belongsTo(models.todo, {
			foreignKey: 'todo_id'
		});
	};

	return Task;
};