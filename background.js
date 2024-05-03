async function generateComment(title) {
  const apiKey = "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";
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  const messages = [
    {
      role: "system",
      content:
        "You are a content writer who has to comment on the YouTube videos based on the title given to you, but it should  look like a generic human comment . It should not be more than 50 words and 100 characters.",
    },
    {
      role: "user",
      content: title,
    },
  ];

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "response-format": "json_object",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages, model: "mixtral-8x7b-32768" }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    const comment = data.choices[0].message.content;
    console.log("Generated comment:", comment);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
