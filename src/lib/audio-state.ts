"use client";

type Listener = (isPlaying: boolean) => void;

class AudioState {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    this.audio = new Audio("/audio/ambient.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.25;

    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  public getAudio(): HTMLAudioElement | null {
    if (!this.audio && typeof window !== "undefined") {
      this.init();
    }
    return this.audio;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public async play(): Promise<boolean> {
    const audio = this.getAudio();
    if (!audio) return false;
    try {
      // Fade in smoothly from 0 to 0.25
      audio.volume = 0.05;
      await audio.play();
      this.isPlaying = true;
      this.notify();

      // Smooth volume ramp
      let currentVol = 0.05;
      const targetVol = 0.25;
      const interval = setInterval(() => {
        if (!this.audio || !this.isPlaying) {
          clearInterval(interval);
          return;
        }
        currentVol = Math.min(targetVol, currentVol + 0.03);
        this.audio.volume = currentVol;
        if (currentVol >= targetVol) {
          clearInterval(interval);
        }
      }, 50);

      return true;
    } catch (err) {
      console.warn("Audio autoplay blocked by browser:", err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

export const globalAudio = new AudioState();

