module.exports = (sequelize, Sequelize) => {
	var User = sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			role:{
				type: Sequelize.ENUM,
				values: ["Пользователь", "Администратор"],
				allowNull: false
			},
			login: {
				type: Sequelize.STRING(64),
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(256),
				allowNull: false
			}
		});
	
	User.associate = (models) => {
		User.hasMany(models.todo, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			sourceKey: 'id'
		});
	};

	return User;
};