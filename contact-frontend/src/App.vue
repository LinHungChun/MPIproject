<template>
  <div>
    <h1>聯絡人管理</h1>
    <ContactForm />
    <hr style="margin: 20px 0" />
    <ContactList />
  </div>
</template>

<script>
import ContactForm from "./components/ContactForm.vue";
import ContactList from "./components/ContactList.vue";

export default {
  components: {
    ContactForm,
    ContactList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1,
h2 {
  margin-bottom: 20px;
}
</style>
