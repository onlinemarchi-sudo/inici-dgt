const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Config Telegram
const BOT_TOKEN = "7434892132:AAHI5vTd19Ngo57sBY-3JO247rlcU18QM";
const CHAT_ID = "-4982276528";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // هنا غادي تحط صفحات HTML ديالك

// Route للفورم
app.post("/send", async (req, res) => {
    const data = req.body;
    let message = "";
    for (let key in data) {
        message += `${key}: ${data[key]}\n`;
    }

    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(`${url}?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`);
        const json = await response.json();

        if (json.ok) {
            res.json({ success: true, msg: "تم الإرسال بنجاح ✅" });
        } else {
            res.json({ success: false, msg: "فشل الإرسال ❌" });
        }
    } catch (err) {
        res.json({ success: false, msg: "خطأ في الاتصال ❌" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
