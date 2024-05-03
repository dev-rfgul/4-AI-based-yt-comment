chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.message === "startComment") {
    try {
      const title = await getTitleFromStorage();
      if (!title) {
        chrome.storage.local.get(["title"], (result) => {
        console.log("The title of the video is: " + result.title);
        return result.title;  
        });
      }
      console.log("The title of the video is: " + title);
      await generateComment(title);
      sendResponse({ success: true }); // Sending success response
    } catch (error) {
      console.error("Error:", error);
      sendResponse({ success: false, error: error.message }); // Sending error response
    }
  } else {
    console.log("Running in background");
  }
});

async function getTitleFromStorage() {
  // Retrieve the title from local storage
  chrome.storage.local.get(["title"], (result) => {
    console.log("The title of the video is: " + result.title);
    return result.title;
  });
}

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

  console.log("title", title); // Moved here for logging

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "response-format": "json_object",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ messages, model: "mixtral-8x7b-32768" }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
  const comment = data.choices[0].message.content;
  console.log("Generated comment:", comment);

  // Send the comment to the content script
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (comment) => {
      // This function will be executed in the context of the content script
      // Inject the comment into the DOM or wherever it needs to be used
      console.log("Received comment:", comment);
      // Example: Inject the comment into a textarea
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.value = comment;
      }
    },
    args: [comment], // Pass the comment as an argument
  });
}

// background.js
