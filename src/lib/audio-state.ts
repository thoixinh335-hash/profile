"use client";

import { PLAYLIST, type Track } from "@/data/playlist";

type Listener = (isPlaying: boolean, trackIndex: number) => void;

class AudioState {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isLoopPlaylist = true;
  private currentTrackIndex = 0;
  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    const initialTrack = PLAYLIST[this.currentTrackIndex];
    this.audio = new Audio(initialTrack ? initialTrack.audioSrc : "/audio/ambient.mp3");
    this.audio.loop = false; // We manage loop transitions programmatically
    this.audio.volume = 0.25;

    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.notify();
    });

    // Auto-advance to next track in playlist loop when song ends
    this.audio.addEventListener("ended", () => {
      if (this.isLoopPlaylist) {
        this.nextTrack(true);
      } else {
        this.isPlaying = false;
        this.notify();
      }
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

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getCurrentTrack(): Track {
    return PLAYLIST[this.currentTrackIndex] || PLAYLIST[0];
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.currentTrackIndex);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.currentTrackIndex));
  }

  public async play(): Promise<boolean> {
    const audio = this.getAudio();
    if (!audio) return false;
    try {
      try {
        audio.volume = 0.05;
      } catch {
        // iOS Safari read-only volume property
      }
      await audio.play();
      this.isPlaying = true;
      this.notify();

      let currentVol = 0.05;
      const targetVol = 0.25;
      const interval = setInterval(() => {
        if (!this.audio || !this.isPlaying) {
          clearInterval(interval);
          return;
        }
        currentVol = Math.min(targetVol, currentVol + 0.03);
        try {
          if (this.audio) this.audio.volume = currentVol;
        } catch {
          // iOS Safari volume restriction
        }
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

  public setTrack(index: number, autoPlay = true) {
    const nextIdx = (index + PLAYLIST.length) % PLAYLIST.length;
    this.currentTrackIndex = nextIdx;
    const track = PLAYLIST[nextIdx];
    const audio = this.getAudio();
    if (audio && track) {
      audio.pause();
      audio.src = track.audioSrc;
      audio.currentTime = 0;
      this.notify();
      if (autoPlay || this.isPlaying) {
        this.play();
      }
    }
  }

  public nextTrack(autoPlay = true) {
    this.setTrack(this.currentTrackIndex + 1, autoPlay);
  }

  public prevTrack(autoPlay = true) {
    const audio = this.getAudio();
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      if (autoPlay || this.isPlaying) {
        this.play();
      }
      return;
    }
    this.setTrack(this.currentTrackIndex - 1, autoPlay);
  }

  public setLoopPlaylist(loop: boolean) {
    this.isLoopPlaylist = loop;
    this.notify();
  }

  public getIsLoopPlaylist(): boolean {
    return this.isLoopPlaylist;
  }

  // Backward compatibility alias
  public setLoop(loop: boolean) {
    this.setLoopPlaylist(loop);
  }

  public getIsLooping(): boolean {
    return this.getIsLoopPlaylist();
  }
}

export const globalAudio = new AudioState();
