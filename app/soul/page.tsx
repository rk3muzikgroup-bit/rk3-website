import CockpitRide from "../../components/CockpitRide";

export default function SoulRidePage() {
  return (
    <CockpitRide
      theme="soul"
      windowVideoSrc="/videos/soul_window.mp4"
      audioSrc="/audio/soul_ride.mp3"
      cockpitPngSrc="/images/cockpit/cockpit_frame_rk3.png"
      cockpitFit="contain"
      cockpitScale={1.0}
      cockpitOffsetY={0}
      brandMaskEnabled={true}
    />
  );
}
