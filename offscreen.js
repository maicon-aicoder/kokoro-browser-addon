chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'playAudio' && message.audioDataUri) {
    try {
      const audio = new Audio(message.audioDataUri);
      audio.play();
    } catch (error) {
      console.error('Error playing audio in offscreen document:', error);
    }
  }
});
