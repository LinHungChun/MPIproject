<template>
  <div>
    <h2>填寫聯絡資訊</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="gender">性別:</label>
        <input type="text" id="gender" v-model="formData.gender" />
      </div>
      <div>
        <label for="address">住址:</label>
        <input type="text" id="address" v-model="formData.address" />
      </div>
      <div>
        <label for="phone">電話:</label>
        <input type="tel" id="phone" v-model="formData.phone" />
      </div>
      <div>
        <label for="birthday">生日:</label>
        <input type="date" id="birthday" v-model="formData.birthday" />
      </div>
      <button type="submit">提交</button>
    </form>
    <div v-if="submissionStatus" style="margin-top: 20px">
      <p>{{ submissionStatus }}</p>
    </div>
  </div>
</template>

// 引入了 axios
<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        gender: "",
        address: "",
        phone: "",
        birthday: "",
        // 其他欄位
      },
      submissionStatus: "",
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/contacts",
          this.formData
        );
        console.log("提交成功:", response.data);
        this.submissionStatus = "聯絡資訊已成功提交！";
        // 清空表單
        this.formData = {
          name: "",
          gender: "",
          address: "",
          phone: "",
          birthday: "",
        };
      } catch (error) {
        console.error("提交失敗:", error);
        this.submissionStatus = "提交失敗，請稍後再試。";
      }
    },
  },
};
</script>

<style>
 {
  display: inline-block;
  width: 80px;
  margin-bottom: 5px;
}
input[type="text"],
input[type="tel"],
input[type="date"] {
  width: 200px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
