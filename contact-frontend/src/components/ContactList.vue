<template>
  <div>
    <h2>已填寫的聯絡資訊</h2>
    <ul v-if="contacts.length > 0">
      <li v-for="(contact, index) in contacts" :key="index">
        姓名: {{ contact.name }}, 性別: {{ contact.gender || "未提供" }}, 住址:
        {{ contact.address || "未提供" }}, 電話:
        {{ contact.phone || "未提供" }}, 生日:
        {{ contact.birthday || "未提供" }}
      </li>
    </ul>
    <p v-else>目前沒有任何聯絡資訊。</p>
  </div>
</template>

// 引入了 axios
<script>
import axios from "axios";

export default {
  data() {
    return {
      contacts: [],
    };
  },

  mounted() {
    this.fetchContacts();
  },

  methods: {
    async fetchContacts() {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        this.contacts = response.data;
        console.log("成功獲取聯絡人列表:", this.contacts);
      } catch (error) {
        console.error("獲取聯絡人列表失敗:", error);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
