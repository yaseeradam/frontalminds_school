// Simple sound effects using Web Audio API
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  playTone(frequency, duration = 200, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  playSuccess() {
    // Happy ascending notes
    this.playTone(523.25, 150); // C5
    setTimeout(() => this.playTone(659.25, 150), 100); // E5
    setTimeout(() => this.playTone(783.99, 300), 200); // G5
  }

  playError() {
    // Gentle descending notes
    this.playTone(392, 200); // G4
    setTimeout(() => this.playTone(349.23, 300), 150); // F4
  }

  playClick() {
    this.playTone(800, 50, 'square');
  }

  playAchievement() {
    // Celebration melody
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 200), index * 100);
    });
  }

  playGameStart() {
    this.playTone(440, 100); // A4
    setTimeout(() => this.playTone(554.37, 200), 100); // C#5
  }
}

export default new SoundEffects();