// chrome.runtime.onMessage.addListener(function (request) {
//   if (request.message === "startProcess") {
//     console.log("Process started from content.js");
//     console.log("response sent from content.js");

//     let videoSelector = document.querySelectorAll(
//       "#thumbnail > yt-image > img"
//     )[1];
//     console.log("vido selector", videoSelector);
//     videoSelector.click();

//     setTimeout(function (sendMessage) {
//       const titleElement = document.querySelector(
//         "#title yt-formatted-string"
//       ).innerText;
//       console.log(titleElement);
//       chrome.runtime.sendMessage({
//         action: "getTitle",
//         title: titleElement,
//       });
//      const res = await generateComment(title);
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
//       throw new Error(`Network response was not ok: ${response.statusText}`);
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

//       // like the video
//       const buttonViewModel = document.querySelector("button-view-model");

//       if (buttonViewModel) {
//         const likeButton = buttonViewModel.querySelector("button");

//         if (likeButton) {
//           likeButton.click();
//         } else {
//           console.error("Like button not found within button-view-model");
//         }
//       } else {
//         console.error("button-view-model element not found");
//       }

//       // Scroll
//       window.scrollBy(0, 400);
//       console.log("Scrolled");
//       let subscribeButton = document.querySelector(
//         "#subscribe-button-shape > button"
//       );
//       subscribeButton.click();

//       var placeholderInterval = setInterval(function () {
//         // chrome.runtime.onMessage.addListener(function(request){
//         var placeholder = document.getElementById("placeholder-area");
//         if (placeholder) {
//           clearInterval(placeholderInterval);
//           placeholder.focus();
//           placeholder.click();
//           document.execCommand("insertText", true, "nice video");

//           // document.execCommand("insertText", true, "nice video");

//           // Listen for message from the background script

//           console.log(request.message);

//           // Wait for submit button to be available
//           var buttonInterval = setInterval(function () {
//             var button = document.getElementById("submit-button");
//             if (button) {
//               clearInterval(buttonInterval);
//               button.click();
//             } else {
//               console.log("Button with ID 'submit-button' not found.");
//             }
//           }, 1000); // Check every second for the submit button
//         } else {
//           console.log("Element with ID 'placeholder-area' not found.");
//         }
//       }, 1000); // Check every second for the placeholder area
//     }, 3000); // Wait for 2 seconds after subscription click
//     // });
//   }
// });

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === "startProcess") {
    console.log("Process started from content.js");
    console.log("response sent from content.js");

    let videoSelector = document.querySelectorAll(
      "#thumbnail > yt-image > img"
    )[4];
    console.log("video selector", videoSelector);
    videoSelector.click();

    setTimeout(async function () {
      const titleElement = document.querySelector(
        "#title yt-formatted-string"
      ).innerText;
      console.log(titleElement);

      try {
        const comment = await generateComment(titleElement);
        console.log("Generated comment:", comment);

        // Send the comment to the extension's background script
        chrome.runtime.sendMessage({
          action: "comment",
          comment: comment,
        });

        // Like the video
        const buttonViewModel = document.querySelector("button-view-model");

        if (buttonViewModel) {
          const likeButton = buttonViewModel.querySelector("button");

          if (likeButton) {
            likeButton.click();
          } else {
            console.error("Like button not found within button-view-model");
          }
        } else {
          console.error("button-view-model element not found");
        }

        // Scroll
        window.scrollBy(0, 450);
        console.log("Scrolled");

        let subscribeButton = document.querySelector(
          "#subscribe-button-shape > button"
        );
        subscribeButton.click();

        var placeholderInterval = setInterval(function () {
          var placeholder = document.getElementById("placeholder-area");
          if (placeholder) {
            clearInterval(placeholderInterval);
            placeholder.focus();
            placeholder.click();
            document.execCommand("insertText", true, comment);

            // Listen for message from the background script

            console.log(request.message);

            // Wait for submit button to be available
            var buttonInterval = setInterval(function () {
              var button = document.getElementById("submit-button");
              if (button) {
                clearInterval(buttonInterval);
                button.click();
              } else {
                console.log("Button with ID 'submit-button' not found.");
              }
            }, 1000); // Check every second for the submit button
          } else {
            console.log("Element with ID 'placeholder-area' not found.");
          }
        }, 1000); // Check every second for the placeholder area
      } catch (error) {
        console.error("Error:", error);
      }
    }, 3000); // Wait for 3 seconds after subscription click
  }
});

async function generateComment(title) {
  const apiKey = "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";
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  const messages = [
    {
      role: "system",
      content:
        "You are a content writer who has to comment on the YouTube videos based on the title given to you, but it should look like a generic human comment. It should not be more than 50 words and 100 characters.",
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

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    const comment = data.choices[0].message.content;
    return comment;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
}
