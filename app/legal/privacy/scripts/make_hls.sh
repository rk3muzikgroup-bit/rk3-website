#!/usr/bin/env bash
set -euo pipefail
in="$1"; outdir="$2" # outdir like public/hls/street_ride
mkdir -p "$outdir"
# 1080p, 720p, 480p ladder; stereo AAC
ffmpeg -y -i "$in" -filter_complex \
"[0:v]split=3[v1][v2][v3];
 [v1]scale=w=1920:h=-2:flags=bicubic[v1080];
 [v2]scale=w=1280:h=-2:flags=bicubic[v720];
 [v3]scale=w=854:h=-2:flags=bicubic[v480]" \
 -map "[v1080]" -map a:0 -c:v:0 libx264 -b:v:0 5000k -maxrate:v:0 5500k -bufsize:v:0 8000k -profile:v:0 high -preset medium -g 48 -keyint_min 48 -sc_threshold 0 -c:a:0 aac -b:a:0 160k \
 -map "[v720]"  -map a:0 -c:v:1 libx264 -b:v:1 3000k -maxrate:v:1 3300k -bufsize:v:1 5000k -profile:v:1 main -preset medium -g 48 -keyint_min 48 -sc_threshold 0 -c:a:1 aac -b:a:1 128k \
 -map "[v480]"  -map a:0 -c:v:2 libx264 -b:v:2 1500k -maxrate:v:2 1650k -bufsize:v:2 2500k -profile:v:2 main -preset medium -g 48 -keyint_min 48 -sc_threshold 0 -c:a:2 aac -b:a:2 96k \
 -f hls -hls_time 4 -hls_playlist_type vod -hls_flags independent_segments \
 -master_pl_name master.m3u8 \
 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
 -hls_segment_filename "$outdir/%v/part_%03d.ts" "$outdir/%v/index.m3u8"
echo "✓ HLS written to $outdir/master.m3u8"
