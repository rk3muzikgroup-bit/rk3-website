#!/bin/bash
# RK3 Hollywood Backup Script for package.json

set -e

# Directory to hold backups
BACKUP_DIR="scripts/package_backups"
mkdir -p $BACKUP_DIR

# Create timestamp
TS=$(date '+%Y-%m-%d_%H-%M-%S')

# Copy current package.json to backup folder
cp package.json "$BACKUP_DIR/package_$TS.json"

echo "✅ package.json backed up to $BACKUP_DIR/package_$TS.json"
