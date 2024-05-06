// chrome.runtime.onMessage.addListener(async function (
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.action === "getTitle") {
//     // try {
     
//     //     chrome.storage.local.get({"title": title}, (result) => {
//     //       console.log("The title of the video is: " + result.title);
//     //       return result.title;
//     //     });
      
//     //   console.log("The title of the video is: " + title);
//      const title = request.title;
//      const res = await generateComment(title);
//      chrome.runtime.sendMessage({ message: res });
//      console.log("Comment:", res);

//     //   sendResponse({ success: true, comment: res }); // Sending success response
      
//     // } catch (error) {
//     //   console.log("Error:", error);
//     //   sendResponse({ success: false, error: error.message }); // Sending error response
//     // }
//   } else {
//     console.log("Running in background");
//   }
// });

// // async function getTitleFromStorage() {

// //     chrome.storage.local.get({"title": title}, (result) => {
// //       if (chrome.runtime.lastError) {
// //         reject(chrome.runtime.lastError);
// //       } else {
// //       return result.title;
// //       }
// //     });
  
// // }

// async function generateComment(title) {
//   const apiKey = "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";
//   // const apiKey = "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";
//   // const apiKey = "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";
//   const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
//   const messages = [
//     {
//       role: "system",
//       content:
//         "You are a content writer who has to comment on the YouTube videos based on the title given to you, but it should  look like a generic human comment . It should not be more than 50 words and 100 characters.",
//     },
//     {
//       role: "user",
//       content: title,
//     },
//   ];

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "response-format": "json_object",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({ messages, model: "mixtral-8x7b-32768" }),
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error(
//         `Network response was not ok: ${response.statusText}`
//       );
//     }

//     const data = await response.json();
//     console.log(data);
//     const comment = data.choices[0].message.content;
//     console.log("Generated comment:", comment);
//     return comment;
 
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }





//hello




