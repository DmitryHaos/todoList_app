<template>
	<div class="container-fluid">
		<div class="todo">
			<div class="todo_header" v-if="adding">
				<div>
					<input class="form-control" type="text" placeholder="Имя списка" v-model="newTodo.name"/>
				</div>
				<div>
					<button class="add_button" @click="addTodo()" :disabled="newTodo.name.length === 0">
						Добавить
					</button>
					<button class="cancel_button" @click="adding = false;">
						Отмена
					</button>
				</div>
			</div>
			<div class="todo_header" v-else>
				<div>
					<h6>Списки дел</h6>
				</div>
				<div>
					<button @click="adding = true;">Добавить</button>
				</div>
			</div>
			<div class="todo_main">
				<div v-if="todos.length === 0" class="empty_list">
					<span>Добавьте свой первый список</span>
				</div>
				<ul v-else class="todo_list">
					<li class="todo_list_item" v-for="(todo, index) in todos" :key="index">
						<div class="text">
							<router-link :to="{
								name: 'item-todo',
								params: { id: todo.id }
							}">
								{{todo.name}}
							</router-link>
						</div>
						<div class="button" @click.stop="deleteTodo(todo)">
							X
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import http from "@/http-common";
	export default {
		name: 'ListTodo',
		data() {
			return {
				todos: [],
				newTodo: {
					user_id: null,
					name: ""
				},
				adding: false
			}
		},
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			}
		},
		watch: {
			adding:{
				handler(){
					if (!this.adding){
						this.newTodo = {
							user_id: null,
							name: ""
						};
					}
				}
			}
		},
		methods: {
			getTodos(){
				http
					.get("/todos")
					.then(response => {
						this.todos = response.data.filter(task => task.user_id === this.currentUser.id);
					})
					.catch(e => {
						console.log(e);
					});
			},
			addTodo(){
				this.newTodo.user_id = this.currentUser.id;
				http
					.post("/todos", this.newTodo)
					.then(() => {
						this.adding = false;
						this.getTodos();
					})
					.catch(e => {
						console.log(e);
					});
			},
			deleteTodo(todo){
				http
					.delete(`/todos/${todo.id}`)
					.then(() => {
						this.getTodos();
					})
					.catch(e => {
						console.log(e);
					});
			}
		},
		created(){
			this.getTodos();
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
		align-items: center;
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
	.todo > .todo_header > div > .form-control{
		padding: 1px;
		border-radius: 5px;
	}
	.todo > .todo_header > div > h6{
		color: white;
		font-weight: bold;
		margin: 5px;
	}
	.todo > .todo_header > div > button{
		border: none;
		padding: 2px;
		margin: 5px;
		font-weight: bold;
		border-radius: 5px;
	}
	.todo > .todo_header > div > .add_button{
		background-color: #44FF44;
	}
	.todo > .todo_header > div > .cancel_button{
		background-color: #FF4444;
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
	.todo > .todo_main > .todo_list > .todo_list_item > .text > a{
		text-decoration: none;
		color: #000000;
	}
	.todo > .todo_main > .todo_list > .todo_list_item > .button{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 10%;
		border-left: 1px solid black;
		color: #FF0000;
	}
</style>