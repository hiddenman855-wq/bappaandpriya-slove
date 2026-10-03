/**
 * Web Audio ambient romantic melody synthesizer.
 * Generates soft acoustic music-box / kalimba arpeggios.
 * Never autoplays; starts solely upon user click.
 */

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;
  private masterGain: GainNode | null = null;

  // Chord progression: Fmaj7 -> Cmaj7 -> Am7 -> G
  // Frequency notes in Hz
  private notesSequence = [
    // Fmaj7
    349.23, 440.0, 523.25, 659.25, 523.25, 440.0,
    // Cmaj7
    261.63, 329.63, 392.0, 493.88, 392.0, 329.63,
    // Am7
    220.0, 261.63, 329.63, 392.0, 329.63, 261.63,
    // Gsus4 / G
    196.0, 246.94, 293.66, 392.0, 293.66, 246.94,
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft musical chime: sine + subtle harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      // Gentle pluck envelope (attack 0.04s, gentle release 1.6s)
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.65);
    } catch (e) {
      console.warn('Audio playback note issue', e);
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;

    const tick = () => {
      if (!this.isPlaying) return;
      const freq = this.notesSequence[this.currentStep % this.notesSequence.length];
      this.playTone(freq);
      this.currentStep++;

      // Next note in 480ms (calm, meditative tempo)
      this.timerId = window.setTimeout(tick, 480);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioPlayer();
