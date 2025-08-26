chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "kokoroTTS",
    title: "Kokoro TTS",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "kokoroTTS" && info.selectionText) {
    try {
      const response = await fetch("http://localhost:8880/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "kokoro",
          input: info.selectionText,
          voice: "pf_dora",
          response_format: "wav",
          speed: 1,
          stream: false,
          return_timestamps: false,
          return_download_link: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioArrayBuffer = await response.arrayBuffer();

      if (audioArrayBuffer && audioArrayBuffer.byteLength > 0) {
        // Convert ArrayBuffer to Base64 in chunks to avoid "Maximum call stack size exceeded" error
        let binary = '';
        const bytes = new Uint8Array(audioArrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);
        const audioDataUri = `data:audio/wav;base64,${base64Audio}`;

        // Ensure the offscreen document is open
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: ['AUDIO_PLAYBACK'],
          justification: 'Playing TTS audio',
        });

        // Send the audio data URI to the offscreen document
        chrome.runtime.sendMessage({
          type: 'playAudio',
          audioDataUri: audioDataUri,
        });

      } else {
        console.error("No audio data received from Kokoro TTS server.");
      }

    } catch (error) {
      console.error("Error sending text to Kokoro TTS server:", error);
    }
  }
});
