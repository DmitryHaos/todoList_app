var db = require('../config/db.config.js');
var Task = db.task;

var globalFunctions = require('../config/global.functions.js');

// Получение всех задач в списке
exports.findAll = (req, res) => {
	Task.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};

// Получение задачи по id
exports.findById = (req, res) => {
	Task.findByPk(req.params.id)
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

// Добавление задачи
exports.create = (req, res) => {
	Task.create({
		todo_id: req.body.todo_id,
		name: req.body.name,
		done: false,
		important: req.body.important
	})
	.then(object => {
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	})
};

// Удаление задачи по id
exports.delete = (req, res) => {
	Task.destroy({
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

// Обновление задачи по id
exports.update = (req, res) => {
	Task.update({
		done: req.body.done
	}, {
		where: {
			id: req.params.id
		}
	})
	.then(object => {
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	});
};