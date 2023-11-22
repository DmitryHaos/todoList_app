<template>
	<div class="container-fluid" v-if="loaded">
		<div class="todo">
			<div class="todo_header">
				<div>
					<h6>Список дел</h6>
				</div>
				<div>
					<button @click="adding = true;">Добавить</button>
				</div>
			</div>
			<div class="todo_main">
				<div v-if="tasks.length === 0" class="empty_list">
					<span>Добавьте свою первую задачу</span>
				</div>
				<ul v-else class="todo_list">
					<li class="todo_list_item" v-for="(task, index) in tasks" :key="index" @click="updateTask(task)">
						<div class="text" :class="{done: task.done, important: task.important}">
							<span>{{task.name}}</span>
						</div>
						<div class="button" @click.stop="deleteTask(task)">
							X
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="modal" :class="{'d-block': adding }">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Добавление новой задачи</h5>
					<button class="btn-close" @click="adding = false;"></button>
				</div>
				<div class="modal-body">
					<div class="block">
						<div class="x_item x_label">
							Задача
						</div>
						<div class="x_item x_input">
							<input type="text" v-model="newTask.name">
						</div>
					</div>
					<div class="block">
						<div class="x_item x_label">
							Высокий приоритет
						</div>
						<div class="x_item x_input">
							<input type="checkbox" v-model="newTask.important">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" @click="addTask()" :disabled="newTask.name.length === 0">
						Добавить
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from "@/http-common";
	export default {
		name: 'ListTask',
		props: {
			id: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				tasks: [],
				newTask: {
					todo_id: this.id,
					name: "",
					important: false
				},
				adding: false,
				loaded: false
			}
		},
		watch: {
			adding:{
				handler(){
					if (!this.adding){
						this.newTask = {
							todo_id: this.id,
							name: "",
							important: false
						};
					}
				}
			}
		},
		methods: {
			getTodo(){
				http
					.get(`/todos/${this.id}`)
					.then(response => {
						if (response.data.id !== this.id){
							this.$router.push("/error");
							return;
						}
						this.loaded = true;
						this.getTasks();
					})
					.catch(e => {
						console.log(e);
					});			
			},
			getTasks(){
				http
					.get("/tasks")
					.then(response => {
						this.tasks = response.data.filter(task => task.todo_id === this.id);
					})
					.catch(e => {
						console.log(e);
					});
			},
			addTask(){
				http
					.post("/tasks", this.newTask)
					.then(() => {
						this.adding = false;
						this.getTasks();
					})
					.catch(e => {
						console.log(e);
					});
			},
			deleteTask(task){
				http
					.delete(`/tasks/${task.id}`)
					.then(() => {
						this.getTasks();
					})
					.catch(e => {
						console.log(e);
					});
			},
			updateTask(task){
				var data = {
					done: task.done ^ true
				};
				http
					.put(`/tasks/${task.id}`, data)
					.then(() => {
						this.getTasks();
					})
					.catch(e => {
						console.log(e);
					});
			}
		},
		created(){
			this.getTodo();
		}
	}
</script>

<style name="main" scoped>
	.container-fluid{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
	.todo{
		display: flex;
		flex-direction: column;
		width: 600px;
		aspect-ratio: 3 / 2;
		background-color: #A497D9;
		border-radius: 5px;
	}
	.todo > .todo_header{
		display: flex;
		flex-basis: 10%;
		justify-content: space-between;
		background-color: #8800FF;
		border-radius: 5px;
	}
	.todo > .todo_header > div{
		display: flex;
		align-items: center;
		margin: 4px;
		font-size: 12px;
		user-select: none;
	}
	.todo > .todo_header > div > h6{
		color: white;
		font-weight: bold;
		margin: 5px;
	}
	.todo > .todo_header > div > button{
		border: none;
		padding: 2px;
		font-weight: bold;
		border-radius: 5px;
	}
	.todo > .todo_main{
		display: flex;
		flex-direction: column;
		flex-basis: 90%;
		height: 100%;
		margin: 4px;
	}
	.todo > .todo_main > .empty_list{
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100%;
		max-height: 100%;
		color: black;
		font-weight: bold;
		user-select: none;
	}
	.todo > .todo_main > .todo_list{
		min-height: 100%;
		max-height: 100%;
		margin: 0;
		padding: 0;
		overflow-y: auto;
		list-style-type: none;
		scrollbar-width: thin;
		scrollbar-color: #2222FF #F0F0F0;
	}
	.todo > .todo_main > .todo_list::-webkit-scrollbar {
		width: 10px;
	}
	.todo > .todo_main > .todo_list::-webkit-scrollbar-thumb {
		background-color: #2222FF;
		border-radius: 5px;
	}
	.todo > .todo_main > .todo_list::-webkit-scrollbar-track {
		background-color: #F0F0F0;
		border-radius: 5px;
	}
	.todo > .todo_main > .todo_list > .todo_list_item{
		display: flex;
		margin: 5px;
		border: 1px solid black;
		color: #000000;
		background-color: white;
		user-select: none;
	}
	.todo > .todo_main > .todo_list > .todo_list_item > .text{
		display: flex;
		flex-direction: column;
		flex-basis: 90%;
		overflow-wrap: anywhere;
	}
	.todo > .todo_main > .todo_list > .todo_list_item > .button{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 10%;
		border-left: 1px solid black;
		color: #FF0000;
	}
	.modal-body > .block{
		display: flex;
		justify-content: space-between;
		margin: 10px 0px;
	}
	.modal-body > .block > .x_item{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.modal-body > .block > .x_label{
		flex-basis: 35%;
		align-items: center;
	}
	.modal-body > .block > .x_input{
		flex-basis: 65%;
	}
	.modal-body > .block > .x_input > input[type="checkbox"]{
		align-self: flex-start;
	}
</style>

<style name="custom" scoped>
	.done{
		text-decoration: line-through;
		color: #888888 !important;
	}
	.important{
		color: #FF0000;
	}
</style>