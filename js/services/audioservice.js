import { config } from '../config.js';

class AudioService {
  constructor() {
    this.audioElement = new Audio();
    this.currentTrack = null;
    this.isPlaying = false;

    // Listener otomatis untuk sinkronisasi state UI
    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      window.dispatchEvent(new CustomEvent('audioStateChanged', { detail: { isPlaying: false } }));
    });

    this.audioElement.addEventListener('error', () => {
      this.isPlaying = false;
      window.dispatchEvent(new CustomEvent('audioError', { detail: { code: 'INVALID_TRACK_URL' } }));
    });
  }

  async fetchTracks() {
    try {
      const res = await fetch(`${config.AUDIO_SERVER_URL}/chapters?language=id`);
      if (!res.ok) throw new Error('AUDIO_FETCH_FAILED');
      const data = await res.json();
      return data.chapters || [];
    } catch (err) {
      throw new Error('AUDIO_FETCH_FAILED');
    }
  }

  async playTrack(track) {
    if (!track || !track.audioUrl) throw new Error('INVALID_TRACK_URL');

    this.currentTrack = track;
    this.audioElement.src = track.audioUrl;

    try {
      await this.audioElement.play();
      this.isPlaying = true;
      window.dispatchEvent(new CustomEvent('audioStateChanged', { detail: { isPlaying: true } }));
    } catch (err) {
      this.isPlaying = false;
      throw new Error('AUDIO_PLAYBACK_BLOCKED');
    }
  }

  pause() {
    this.audioElement.pause();
    this.isPlaying = false;
    window.dispatchEvent(new CustomEvent('audioStateChanged', { detail: { isPlaying: false } }));
  }

  togglePlay() {
    if (!this.currentTrack) return;
    if (this.isPlaying) {
      this.pause();
    } else {
      this.audioElement.play();
      this.isPlaying = true;
      window.dispatchEvent(new CustomEvent('audioStateChanged', { detail: { isPlaying: true } }));
    }
  }
}

export const audioService = new AudioService();

