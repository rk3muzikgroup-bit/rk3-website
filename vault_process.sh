#!/bin/bash
set -e

# Paths
INPUT_DIR="RKS3VaultAudio"
OUTPUT_DIR="hollywood"
OUTPUT_FILE="$OUTPUT_DIR/RKS3_Vault_Journey.wav"

# Create output directory if missing
mkdir -p "$OUTPUT_DIR"

# Normalize and fade settings
TARGET_LUFS=-14
FADE_30=1
FADE_60=2
FADE_120=3

# Master sequence order
TRACK_ORDER=(
  01 02 03 04 05 06 07 15 22
  08 09 10 16 17 18 23 27
  11 29 30 28 31
)

# Temp working dir
WORK_DIR=$(mktemp -d)

# Process each track
i=1
for track in "${TRACK_ORDER[@]}"; do
  in_file="$INPUT_DIR/$track.wav"
  out_file="$WORK_DIR/${i}_$track.wav"

  # 🔎 Debug: show what file we’re looking for
  echo "🔎 Checking: $(pwd)/$in_file"

  # Decide fade length by duration
  duration=$("$HOME/sox/soxi" -D "$in_file")
  fade=0
  if (( $(echo "$duration == 30" | bc -l) )); then fade=$FADE_30; fi
  if (( $(echo "$duration == 60" | bc -l) )); then fade=$FADE_60; fi
  if (( $(echo "$duration == 120" | bc -l) )); then fade=$FADE_120; fi

  # Normalize + apply fades
  "$HOME/sox/sox" "$in_file" "$out_file" gain -n $TARGET_LUFS fade t $fade -0 $fade
  i=$((i+1))
done

# Concat all processed files
"$HOME/sox/sox" $(ls -v "$WORK_DIR"/*.wav) "$OUTPUT_FILE"

# Cleanup
rm -rf "$WORK_DIR"

echo "✅ Hollywood Cut Complete: $OUTPUT_FILE"
