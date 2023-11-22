var db = require('../config/db.config.js');
var Todo = db.todo;

var globalFunctions = require('../config/global.functions.js');

// Получение всех списков дел
exports.findAll = (req, res) => {
	Todo.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};

// Получение списка дел по id
exports.findById = (req, res) => {
	Todo.findByPk(req.params.id)
		.then(object => {
			if (object === null){
				object = {};
			}
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};

// Добавление списка дел
exports.create = (req, res) => {
	Todo.create({
		user_id: req.body.user_id,
		name: req.body.name
	})
	.then(object => {
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	})
};

// Удаление списка дел по id
exports.delete = (req, res) => {
	Todo.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => {
		globalFunctions.sendResult(res, 'Запись удалена');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};