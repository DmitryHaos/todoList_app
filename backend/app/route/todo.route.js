module.exports = (app) => {
	const todo = require('../controller/todo.controller');
	var { authJwt } = require("../middleware");

	// Получение всех списков дел
	app.get('/api/todos', [authJwt.verifyToken], todo.findAll);

	// Получение списка дел по id
	app.get('/api/todos/:id', [authJwt.verifyToken], todo.findById);

	// Добавление списка дел
	app.post('/api/todos', [authJwt.verifyToken], todo.create);

	// Удаление списка дел по id
	app.delete('/api/todos/:id', [authJwt.verifyToken], todo.delete);
}