module.exports = (app) => {
	const task = require('../controller/task.controller');
	var { authJwt } = require("../middleware");

    // Получение всех задач в списке
    app.get('/api/tasks', [authJwt.verifyToken], task.findAll);

	// Получение задачи по id
	app.get('/api/tasks/:id', [authJwt.verifyToken], task.findById);

	// Добавление задачи
	app.post('/api/tasks', [authJwt.verifyToken], task.create);

	// Удаление задачи по id
	app.delete('/api/tasks/:id', [authJwt.verifyToken], task.delete);

	// Обновление задачи по id
	app.put('/api/tasks/:id', [authJwt.verifyToken], task.update);
}