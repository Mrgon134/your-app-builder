import os
from PIL import Image

# Paths
input_image_path = r"C:\Users\irfan\.gemini\antigravity\brain\9d2b31e3-3fa6-4348-bb37-8c2d335bc856\media__1780141175030.png"
public_dir = r"c:\Users\irfan\Desktop\nuju antigravity\public"

# Ensure output directory exists
os.makedirs(public_dir, exist_ok=True)

# Get LANCZOS resampling method
try:
    resample_method = Image.Resampling.LANCZOS
except AttributeError:
    resample_method = Image.LANCZOS

def convert_icons():
    if not os.path.exists(input_image_path):
        print(f"Error: Input image not found at {input_image_path}")
        return

    with Image.open(input_image_path) as img:
        # 1. Save favicon.png (512x512)
        fav_png = img.resize((512, 512), resample_method)
        fav_png.save(os.path.join(public_dir, "favicon.png"), "PNG")
        print("Saved favicon.png (512x512)")

        # 2. Save pwa-512x512.png (512x512)
        pwa_512 = img.resize((512, 512), resample_method)
        pwa_512.save(os.path.join(public_dir, "pwa-512x512.png"), "PNG")
        print("Saved pwa-512x512.png")

        # 3. Save pwa-192x192.png (192x192)
        pwa_192 = img.resize((192, 192), resample_method)
        pwa_192.save(os.path.join(public_dir, "pwa-192x192.png"), "PNG")
        print("Saved pwa-192x192.png")

        # 4. Save favicon.ico (multi-resolution ICO file)
        # Recommended sizes for .ico: 16, 32, 48, 64, 128, 256
        ico_sizes = [16, 32, 48, 64, 128, 256]
        ico_images = [img.resize((size, size), resample_method) for size in ico_sizes]
        
        # Save the first image with the rest as additional frames
        ico_images[0].save(
            os.path.join(public_dir, "favicon.ico"),
            format="ICO",
            sizes=[(size, size) for size in ico_sizes],
            append_images=ico_images[1:]
        )
        print("Saved favicon.ico with multi-resolution support (16px to 256px)")

if __name__ == "__main__":
    convert_icons()
