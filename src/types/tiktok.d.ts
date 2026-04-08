interface TikTokPixel {
  page: () => void;
  track: (event: string, properties?: Record<string, unknown>) => void;
  identify: (id: string, properties?: Record<string, unknown>) => void;
  load: (pixelId: string, options?: Record<string, unknown>) => void;
  instance: (pixelId: string) => TikTokPixel;
}

declare global {
  interface Window {
    ttq: TikTokPixel;
  }
}

export {};
