chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "startProcess") {
    async function generateHashtags() {
      const apiKey = "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";

      const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

      chrome.storage.local.get(["title"], (result) => {
        let title = result.title;
        console.log("The title of the video is: " + result.title);
        // You can add any code that needs to use the retrieved title here
      });

      const messages = [
        {
          role: "system",
          content:
            "You are a content writer who have to comment on the youtube videos based on the title given to you it shoudl not be more than 50 words and 100 characters",
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

        const copyIcons = document.getElementsByClassName("copyIcon");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
});
