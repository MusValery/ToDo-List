/** * Created by vouill on 11/13/17. */

<template>
  <div class="navigation">
    <ul>
      <li v-if="isProfileLoaded">
        <router-link to="/account">{{ name }}</router-link>
      </li>
      <li v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </li>
      <li v-if="!isAuthenticated && !authLoading">
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
a
  color: #005778
  text-decoration: none

.navigation
  display: flex
  color: #005778
  align-items: center
  background-color: #C3E5F2
  padding: 5px

  ul
    display: flex
    &:first-child
      flex-grow: 1

    li
      padding-right: 1em
.logout
  &:hover
    cursor: pointer
</style>

<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "actions/auth";

export default {
  name: "navigation",
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading",
      name: state => `${state.user.profile.title} ${state.user.profile.name}`
    })
  }
};
</script>
