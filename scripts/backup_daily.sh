#!/bin/bash
# 🌌 RK3 Daily Backup — Hollywood Mode

# Make sure archive dir exists
mkdir -p scripts/archive

# Timestamp
TS=$(date '+%Y-%m-%d_%H-%M-%S')
TARGET="scripts/archive/$TS"

# Create archive folder for this run
mkdir -p "$TARGET"

# Copy critical files
cp -f package.json "$TARGET/package.json"
cp -f package-lock.json "$TARGET/package-lock.json" 2>/dev/null || true

# Copy logs if they exist
cp -f scripts/matrix_log.txt "$TARGET/matrix_log.txt" 2>/dev/null || true
cp -f scripts/daily_log.txt "$TARGET/daily_log.txt" 2>/dev/null || true

echo "✅ Daily backup saved to $TARGET"
