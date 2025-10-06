// Enhanced voice manager for kid-friendly voices
export const VoiceManager = {
  getKidsVoices() {
    const voices = speechSynthesis.getVoices();
    
    // Filter for kid-friendly voices
    const kidsVoices = voices.filter(voice => 
      voice.name.includes('Zira') ||           // Windows female
      voice.name.includes('Samantha') ||       // macOS female
      voice.name.includes('Karen') ||          // macOS female
      voice.name.includes('Google UK English Female') ||
      voice.name.includes('Microsoft Aria') ||
      (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'))
    );

    return kidsVoices.length > 0 ? kidsVoices : voices.slice(0, 3);
  },

  speak(text, options = {}) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = this.getKidsVoices();
    
    utterance.voice = voices[0];
    utterance.rate = options.rate || 0.8;     // Slower for kids
    utterance.pitch = options.pitch || 1.2;   // Higher pitch
    utterance.volume = options.volume || 0.8;
    
    speechSynthesis.speak(utterance);
  }
};