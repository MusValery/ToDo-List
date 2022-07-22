/** * Created by vouill on 11/13/17. */

<template>
  <div class="headline__container">
    <div class="headline">
      <h1>Your profile</h1>
    </div>
    <p v-if="profile.name">
      <strong>Name:</strong> {{ profile.title }} {{ profile.name }}
    </p>
  </div>
</template>

<style lang="sass" scoped>
.headline__container
  display: flex
  flex-direction: column
  align-items: center

.headline
  margin-top: 1em
  display: flex
  img
    height: 80px
    width: 80px
    border-radius: 50%
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "account",
  computed: mapState({ profile: state => state.user.profile })
};
</script>
