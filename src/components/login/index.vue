/** * Created by vouill on 11/13/17. */

<template>
  <div class="login__container">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
      <div v-if="emailError.length">
        <span v-for="error in emailError" :key="error.id" class="errors">{{
          error
        }}</span>
      </div>
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <div v-if="passError.length">
        <span v-for="error in passError" :key="error.id" class="errors">{{
          error
        }}</span>
      </div>
      <hr />
      <button type="submit" @click="checkForm">
        Login
      </button>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.login__container
  display: flex
  justify-content: center

.login
    display: flex
    flex-direction: column
    width: 300px
    padding: 10px
    gap: 10px

.errors
    color: #FF3333
    font-size: 12px
</style>

<script>
import { AUTH_REQUEST } from "actions/auth";

export default {
  name: "login",
  data() {
    return {
      username: "Admin",
      password: "12345",
      passError: "",
      emailError: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/");
      });
    },
    checkForm(e) {
      if (!this.username) {
        this.emailError = "Name required";
      } else if (this.username.length < 5) {
        this.emailError = "Name must be 5 characters";
      } else if (this.username !== "Admin") {
        this.emailError = "Invalid email";
      } else {
        this.emailError = "";
      }

      if (!this.password) {
        this.passError = "Password required";
      } else if (this.password.length < 5) {
        this.passError = "Password must be 5 characters";
      } else if (this.password !== "12345") {
        this.passError = "Invalid password";
      } else {
        this.passError = "";
      }

      if (this.passError == "" && this.emailError == "") {
        this.login();
      }
      e.preventDefault();
    }
  }
};
</script>
