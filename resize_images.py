#!/usr/bin/env python3
"""
Resize and compress images for the Uganda website hero images.
"""
from PIL import Image
import os

def get_image_info(filepath):
    """Get image dimensions and file size."""
    with Image.open(filepath) as img:
        width, height = img.size
        file_size = os.path.getsize(filepath)
        print(f"Image: {filepath}")
        print(f"  Dimensions: {width} x {height}")
        print(f"  File size: {file_size:,} bytes ({file_size/1024:.1f} KB)")
        return width, height, file_size

def resize_image(input_path, output_path, target_width=None, quality=85):
    """
    Resize and compress an image.
    
    Args:
        input_path: Path to input image
        output_path: Path to output image
        target_width: Target width in pixels (height auto-adjusted)
        quality: JPEG/WebP quality (1-100)
    """
    with Image.open(input_path) as img:
        if target_width and img.width > target_width:
            # Calculate new height to maintain aspect ratio
            ratio = target_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
            print(f"  Resized to: {target_width} x {new_height}")
        
        # Save as WebP with compression
        img.save(output_path, 'WEBP', quality=quality, optimize=True)
        
        new_size = os.path.getsize(output_path)
        print(f"  New file size: {new_size:,} bytes ({new_size/1024:.1f} KB)")
        return new_size

def main():
    """Main function to process all Uganda hero images."""
    images_dir = 'images'
    
    # Image files to process
    images = [
        ('uganda-hero-large.webp', 1920, 85),
        ('uganda-hero-medium.webp', 1280, 80),
        ('uganda-hero-small.webp', 640, 75),
    ]
    
    print("=" * 60)
    print("Uganda Hero Image Processing")
    print("=" * 60)
    
    for filename, target_width, quality in images:
        filepath = os.path.join(images_dir, filename)
        
        if not os.path.exists(filepath):
            print(f"\n{filename}: File not found, skipping...")
            continue
            
        print(f"\nProcessing: {filename}")
        get_image_info(filepath)
        
        # Resize and compress
        resize_image(filepath, filepath, target_width, quality)
        
        # Verify result
        new_size = os.path.getsize(filepath)
        if new_size > 200 * 1024:  # 200 KB
            print(f"  ⚠️  Still larger than 200KB, applying stronger compression...")
            resize_image(filepath, filepath, target_width, quality=60)
    
    print("\n" + "=" * 60)
    print("Processing complete!")
    print("=" * 60)
    
    # Print final status
    print("\nFinal image sizes:")
    for filename, _, _ in images:
        filepath = os.path.join(images_dir, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            status = "✅" if size <= 200 * 1024 else "❌"
            print(f"  {status} {filename}: {size:,} bytes ({size/1024:.1f} KB)")

if __name__ == '__main__':
    main()