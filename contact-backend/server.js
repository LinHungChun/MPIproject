// 引入模組： 引入 express, body-parser, fs/promises, 和 nodemailer
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const cors = require("cors"); // 引入 cors

// 設定 Express 應用程式： 建立 Express 應用程式實例，並設定伺服器監聽的埠號 (3000)
const app = express();
const port = 3000;

// 在創建 app 實例之後，使用 cors 中介軟體來允許所有來源的請求 (在開發階段可以這樣做)：
app.use(cors()); // 使用 cors 中介軟體

// body-parser 中介軟體： 使用 bodyParser.json() 來解析 JSON 格式的請求主體
app.use(bodyParser.json());

// contacts 陣列和檔案路徑： 使用一個陣列 contacts 暫時儲存聯絡人資料，並定義儲存資料的 JSON 檔案路徑 contacts.json
let contacts = [];
const dataFilePath = "contacts.json";

// loadContacts()： 在伺服器啟動時，嘗試從 contacts.json 載入現有的聯絡人資料
async function loadContacts() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    contacts = JSON.parse(data);
    console.log("Contacts loaded successfully.");
  } catch (error) {
    if (error.code === "ENOENT") {
      // File doesn't exist yet, which is fine
      console.log(
        "No existing contacts file found. Starting with an empty list."
      );
    } else {
      console.error("Error loading contacts:", error);
    }
  }
}

// saveContacts()： 將目前的 contacts 陣列內容儲存到 contacts.json 檔案
async function saveContacts() {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2), "utf8");
    console.log("Contacts saved successfully.");
  } catch (error) {
    console.error("Error saving contacts:", error);
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Outlook 的 SMTP 伺服器
  port: 587, // Outlook 的 SMTP 連接埠 (TLS)
  secure: false,
  auth: {
    user: "joanna0414@hotmail.com",
    pass: "87845618",
  },
  debug: true,
  // tls: {
  //    ciphers:'SSLv3'
  // }
});

// sendEmailNotification()： 一個非同步函式，用於發送包含新聯絡人資訊的電子郵件。
async function sendEmailNotification(contact) {
  const mailOptions = {
    from: "joanna0414@hotmail.com",
    to: "changming1102@gmail.com", // Recipient email address
    subject: "New Contact Form Submission",
    text: `A new contact form has been submitted:\n\n${JSON.stringify(
      contact,
      null,
      2
    )}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// /api/contacts (POST)： 這個 API 端點接收前端發送的聯絡人資料 (req.body)，將其添加到 contacts 陣列，儲存到檔案，並發送電子郵件通知。最後，它回傳一個成功的 JSON 回應。
app.post("/api/contacts", async (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  await saveContacts();
  await sendEmailNotification(newContact);
  res.status(201).json({ message: "Contact saved successfully." });
});

// /api/contacts (GET)： 這個 API 端點回傳目前儲存在 contacts 陣列中的所有聯絡人資料
app.get("/api/contacts", async (req, res) => {
  res.json(contacts);
});

// 啟動伺服器： 使用 app.listen() 啟動 Express 伺服器
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  loadContacts();
});
