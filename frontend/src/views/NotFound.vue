<template>
	<div class="container-fluid">
		<div class="window">
			<div class="header">
				<h5>Not Found</h5>
			</div>
			<div class="main">
				<p>
					Страница не найдена! <br/> 
					Попробуйте вернутся 
					<a @click="$router.go(-1)">назад</a> или на <router-link to="/">главную страницу</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<style>
	.container-fluid{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
	.window{
		display: flex;
		flex-direction: column;
		width: 600px;
		aspect-ratio: 3 / 2;
		background-color: #A497D9;
		border-radius: 5px;
	}
	.window > .header{
		display: flex;
		flex-basis: 10%;
		justify-content: center;
		align-items: center;
		align-items: center;
		background-color: #8800FF;
		border-radius: 5px;
	}
	.window > .header > h5{
		color: white;
		font-weight: bold;
		margin: 5px;
	}
	.window > .main{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-basis: 90%;
		height: 100%;
		margin: 4px;
	}
	.window > .main > p{
		text-align: center;
	}
	.window > .main > p > a{
		text-decoration: none;
		color: red;
		user-select: none ;
	}
	.window > .main > p > a:hover{
		color: #0000FF;
	}
</style>