#!/bin/bash

# Make target folder
mkdir -p minified

# Target size
TARGET=6k

echo "=== Starting JPG minification to ≤ $TARGET each ==="
echo "Input folder:  $(pwd)"
echo "Output folder: $(pwd)/minified"
echo

# Loop through all jpg/jpeg files
for img in *.jpg *.jpeg; do
    [ -f "$img" ] || continue  # skip if no match

    echo "Processing: $img"

    # Copy to minified folder
    cp "$img" "minified/$img"
    echo "  Copied to: minified/$img"

    # Run jpegoptim with size constraint
	ffmpeg -i "minified/$img" -vf scale=640:-1 "minified/$img"
    jpegoptim --verbose --size=$TARGET --strip-all "minified/$img"
    echo
done

echo "=== Done! Minified images are in 'minified/' ==="
