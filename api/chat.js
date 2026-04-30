export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a fun BTS-loving cyber AI chatbot."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
}
