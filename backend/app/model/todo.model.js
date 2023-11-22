module.exports = (sequelize, Sequelize) => {
	var Todo = sequelize.define(
		"todo",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			}
		});
	
	Todo.associate = (models) => {
		Todo.hasMany(models.task, {
			foreignKey: 'todo_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			sourceKey: 'id'
		});

		Todo.belongsTo(models.user, {
			foreignKey: 'user_id'
		});
	};

	return Todo;
};