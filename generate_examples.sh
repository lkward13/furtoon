#!/bin/bash

# FurToon Style Example Generator Script
# This script automatically generates all 25 style examples

echo "🎨 FurToon Style Example Generator"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "furtoon_prd.md" ]; then
    echo "❌ Please run this script from the FurToon project root directory"
    exit 1
fi

# Check if Python backend is running
echo "🔍 Checking if backend is running..."
if ! curl -s http://localhost:5001/api/test > /dev/null; then
    echo "❌ Backend not running. Please start the Python backend first:"
    echo "   cd server && python main.py"
    exit 1
fi
echo "✅ Backend is running"

# Check if we have a source image
if [ ! -f "reviewimages/sarahmreview.png" ]; then
    echo "⚠️  No source image found in reviewimages/"
    echo "Please ensure you have a good pet photo to use as the source."
    echo "You can use any of the review images or provide your own."
    echo ""
    read -p "Enter the path to your source pet image: " SOURCE_IMAGE
else
    SOURCE_IMAGE="reviewimages/sarahmreview.png"
    echo "📸 Using source image: $SOURCE_IMAGE"
fi

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Source image not found: $SOURCE_IMAGE"
    exit 1
fi

echo ""
echo "🚀 Starting automatic generation of 25 style examples..."
echo "⏱️  This will take approximately 5-10 minutes"
echo "☕ Grab a coffee while the AI does its magic!"
echo ""

# Run the Python script
python3 generate_style_examples.py <<< "$SOURCE_IMAGE"

echo ""
echo "🎉 All done! Check out your new style gallery at:"
echo "   http://localhost:5173/styles"
