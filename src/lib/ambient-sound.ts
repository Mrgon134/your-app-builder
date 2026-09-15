/**
 * Ambient Sound Generator using Web Audio API synthesis.
 * 100% offline, zero network latency, zero external asset dependencies.
 * Designed for reading, deep focus, and calming overthinking minds.
 */

export type AmbientSoundType = "rain" | "drone" | "fire";

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentType: AmbientSoundType | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private volume: number = 0.4;
  private intervalId: number | null = null;

  private initContext(): AudioContext {
    if (!this.ctx || this.ctx.state === "closed") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getCurrentType(): AmbientSoundType | null {
    return this.currentType;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {}
    });
    this.activeNodes = [];

    this.currentType = null;
  }

  public play(type: AmbientSoundType, volume?: number) {
    this.stop();

    if (volume !== undefined) {
      this.volume = Math.max(0, Math.min(1, volume));
    }

    const ctx = this.initContext();
    this.currentType = type;

    // Master Gain
    const master = ctx.createGain();
    master.gain.setValueAtTime(this.volume, ctx.currentTime);
    master.connect(ctx.destination);
    this.masterGain = master;

    if (type === "drone") {
      this.playCalmDrone(ctx, master);
    } else if (type === "rain") {
      this.playGentleRain(ctx, master);
    } else if (type === "fire") {
      this.playCampfire(ctx, master);
    }
  }

  /**
   * 432 Hz Binaural Relaxation Drone (Theta 4 Hz difference)
   */
  private playCalmDrone(ctx: AudioContext, destination: AudioNode) {
    // 432 Hz Base Pitch
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(432, ctx.currentTime);

    // 436 Hz (4 Hz Theta Binaural Beat for deep relaxation & anxiety reduction)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(436, ctx.currentTime);

    // Warm Sub-Harmonic (216 Hz)
    const oscSub = ctx.createOscillator();
    oscSub.type = "sine";
    oscSub.frequency.setValueAtTime(216, ctx.currentTime);

    // Low-Pass Filter to remove harshness
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.22, ctx.currentTime);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.18, ctx.currentTime);

    const gainSub = ctx.createGain();
    gainSub.gain.setValueAtTime(0.3, ctx.currentTime);

    osc1.connect(gain1);
    gain1.connect(filter);
    osc2.connect(gain2);
    gain2.connect(filter);
    oscSub.connect(gainSub);
    gainSub.connect(filter);

    filter.connect(destination);

    osc1.start();
    osc2.start();
    oscSub.start();

    this.activeNodes.push(
      { stop: () => osc1.stop(), disconnect: () => osc1.disconnect() },
      { stop: () => osc2.stop(), disconnect: () => osc2.disconnect() },
      { stop: () => oscSub.stop(), disconnect: () => oscSub.disconnect() },
      { disconnect: () => filter.disconnect() }
    );
  }

  /**
   * Gentle Rain Generator (Synthesized Brown Noise + Rain Filter)
   */
  private playGentleRain(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = ctx.sampleRate * 4; // 4 seconds buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration
      const brown = (lastOut + 0.025 * white) / 1.025;
      lastOut = brown;
      output[i] = brown * 3.2;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    // Filter to simulate soft raindrops against glass
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.45, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(destination);
    whiteNoise.start();

    this.activeNodes.push(
      { stop: () => whiteNoise.stop(), disconnect: () => whiteNoise.disconnect() },
      { disconnect: () => filter.disconnect() },
      { disconnect: () => rainGain.disconnect() }
    );
  }

  /**
   * Warm Campfire with Gentle Crackles
   */
  private playCampfire(ctx: AudioContext, destination: AudioNode) {
    // Low rumble bed
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.03 * w) / 1.03;
      data[i] = last * 2.5;
    }

    const rumble = ctx.createBufferSource();
    rumble.buffer = buffer;
    rumble.loop = true;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.setValueAtTime(320, ctx.currentTime);

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.35, ctx.currentTime);

    rumble.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(destination);
    rumble.start();

    this.activeNodes.push(
      { stop: () => rumble.stop(), disconnect: () => rumble.disconnect() },
      { disconnect: () => rumbleFilter.disconnect() }
    );

    // Stochastic wood crackle clicks
    const crackleInterval = window.setInterval(() => {
      if (!this.ctx || this.currentType !== "fire") return;
      if (Math.random() > 0.4) {
        const crackleDuration = 0.02 + Math.random() * 0.03;
        const clickBuf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * crackleDuration), this.ctx.sampleRate);
        const cd = clickBuf.getChannelData(0);
        for (let j = 0; j < cd.length; j++) {
          cd[j] = (Math.random() * 2 - 1) * Math.exp(-j / (cd.length * 0.3));
        }

        const click = this.ctx.createBufferSource();
        click.buffer = clickBuf;

        const hp = this.ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(1400 + Math.random() * 800, this.ctx.currentTime);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.12 + Math.random() * 0.18, this.ctx.currentTime);

        click.connect(hp);
        hp.connect(g);
        g.connect(destination);
        click.start();
      }
    }, 180);

    this.intervalId = crackleInterval;
  }
}

export const ambientSound = new AmbientSoundEngine();
