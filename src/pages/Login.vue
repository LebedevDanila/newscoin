<template>
	<div class="auth container">
		<div class="row align-items-center justify-content-between">
			<div class="login col-lg-4">
				<form class="login__form" @submit.prevent="submit">
					<h2>Вход в админ-панель</h2>
					<input v-model="login" type="text" placeholder="Введите Логин">
					<input v-model="password" type="password" placeholder="Введите пароль">
					<input type="submit" value="Войти">
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    	login: '',
    	password: ''
    }
  },
  methods: {
  	async submit() {
  		if(!this.login || !this.password) {
  			alert('Введите значения!');
  			return false;
  		}

  		const authData = {
  			login: this.login,
  			password: this.password
  		}

  		try {
  			await this.$store.dispatch('login', authData);
  			this.$router.push('/admin');
  		} catch(e) {
  			throw e;
  		}
  	}
  }
}
</script>