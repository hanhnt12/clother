<template lang="pug">
  .container
    .column.is-three-fifths.register-panel
      h1 {{ $t("api.users.registerTitle") }}
      form.form-control(action="" autocomplete="off")
        .field
          p.control.has-icons-left.has-icons-right
            input.input(type="text"
              v-model="username"
              :placeholder="$t('common.user.usernamePlaceholder')" 
              autocomplete="off")
            span.icon.is-small.is-left
              i.fas.fa-user
        .field
          p.control.has-icons-left
            input.input(type="password"
              v-model="password"
              :placeholder="$t('common.user.passwordPlaceholder')"
              autocomplete="new-password")
            span.icon.is-small.is-left
              i.fas.fa-lock
        .field
          p.control
            button.button.is-success(@click="register") {{ $t("common.button.register") }}
</template>

<script>
import AuthenticationService from '@/services/AuthenticationServices'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
      alert(response.data.message)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-panel {
  margin: 0 auto;
  border: 1px solid #cecece;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #cecece;
}

.register-panel h1 {
  padding: 20px 0;
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
}
</style>
