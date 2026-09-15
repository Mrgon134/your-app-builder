import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ambientSound } from "@/lib/ambient-sound";
import EbookVipResourcesModal from "@/components/EbookVipResourcesModal";
import EbookAudioWidget from "@/components/EbookAudioWidget";

describe("Ebook Enhancements - Ambient Audio & VIP Modal", () => {
  beforeEach(() => {
    // Mock AudioContext
    window.AudioContext = vi.fn().mockImplementation(() => ({
      state: "running",
      currentTime: 0,
      sampleRate: 44100,
      createGain: vi.fn().mockReturnValue({
        gain: { setValueAtTime: vi.fn(), setTargetAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
      }),
      createOscillator: vi.fn().mockReturnValue({
        type: "sine",
        frequency: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
      createBiquadFilter: vi.fn().mockReturnValue({
        type: "lowpass",
        frequency: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
      }),
      createBuffer: vi.fn().mockReturnValue({
        getChannelData: vi.fn().mockReturnValue(new Float32Array(100)),
      }),
      createBufferSource: vi.fn().mockReturnValue({
        buffer: null,
        loop: false,
        connect: vi.fn(),
        disconnect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
      destination: {},
      resume: vi.fn(),
      close: vi.fn(),
    }));

    // Mock speechSynthesis
    class MockSpeechSynthesisUtterance {
      text: string;
      rate: number = 1;
      lang: string = "id";
      voice: any = null;
      onend: any = null;
      onerror: any = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    (global as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
    (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

    Object.defineProperty(window, "speechSynthesis", {
      value: {
        speak: vi.fn(),
        cancel: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        getVoices: vi.fn().mockReturnValue([
          { lang: "id-ID", name: "Indonesian Voice" },
          { lang: "en-US", name: "English Voice" },
        ]),
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    ambientSound.stop();
    vi.clearAllMocks();
  });

  it("ambientSound plays rain, drone, fire and controls volume", () => {
    expect(ambientSound.getCurrentType()).toBeNull();

    ambientSound.play("drone", 0.5);
    expect(ambientSound.getCurrentType()).toBe("drone");
    expect(ambientSound.getVolume()).toBe(0.5);

    ambientSound.setVolume(0.8);
    expect(ambientSound.getVolume()).toBe(0.8);

    ambientSound.play("rain");
    expect(ambientSound.getCurrentType()).toBe("rain");

    ambientSound.play("fire");
    expect(ambientSound.getCurrentType()).toBe("fire");

    ambientSound.stop();
    expect(ambientSound.getCurrentType()).toBeNull();
  });

  it("renders EbookVipResourcesModal and allows tab switching and voucher copy", () => {
    const handleClose = vi.fn();
    render(
      <EbookVipResourcesModal isOpen={true} onClose={handleClose} lang="id" />
    );

    expect(screen.getByText("VIP Resource Toolkit & Bonus Hub")).toBeInTheDocument();
    expect(screen.getByText("Template Notion Siap Pakai")).toBeInTheDocument();

    // Switch to Voucher tab
    const voucherTab = screen.getByText("Voucher Nuju Pro");
    fireEvent.click(voucherTab);
    expect(screen.getByText("NUJUVIP30")).toBeInTheDocument();

    // Switch to SOS tab
    const sosTab = screen.getByText("SOS Grounding");
    fireEvent.click(sosTab);
    expect(screen.getByText("Teknik Grounding Sensorik 5-4-3-2-1")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByText("Tutup");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders EbookAudioWidget with ambient buttons and triggers speech synthesis", () => {
    const handleOpenVip = vi.fn();
    render(
      <EbookAudioWidget
        currentText="Selamat datang di buku panduan menenangkan pikiran."
        title="Bab 1: Menamai Apa yang Terjadi"
        lang="id"
        onOpenVipModal={handleOpenVip}
      />
    );

    // Check ambient buttons
    const rainBtn = screen.getByTitle("Suara Hujan Tenang");
    fireEvent.click(rainBtn);
    expect(ambientSound.getCurrentType()).toBe("rain");

    // Check VIP modal trigger
    const vipBtn = screen.getByTitle("Buka Bonus VIP & Template Notion");
    fireEvent.click(vipBtn);
    expect(handleOpenVip).toHaveBeenCalledTimes(1);

    // Check Speech Synthesis listen button
    const listenBtn = screen.getByTitle("Dengarkan Narasi Suara");
    fireEvent.click(listenBtn);
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
