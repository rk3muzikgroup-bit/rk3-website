#!/bin/bash
# RK3 Hollywood Restore Script for package.json

set -e

BACKUP_DIR="scripts/package_backups"

# Find the most recent backup
LATEST_BACKUP=$(ls -t $BACKUP_DIR/package_*.json 2>/dev/null | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "❌ No backups found in $BACKUP_DIR"
  exit 1
fi

# Restore the latest backup
cp "$LATEST_BACKUP" package.json

echo "✅ Restored package.json from $LATEST_BACKUP"
