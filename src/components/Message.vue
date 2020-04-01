<template>
  <div class="message">{{messageData}}</div>
</template>

<script>
export default {
  name: "message",
  props: ["messageData"],
  methods: {},
  computed: {}
};
</script>

<style>
.frame {
  height: 45%;
  width: 35%;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: grey;
  margin: 3px;
}
</style>