import CockpitRide from "../../components/CockpitRide";

export default function SpiritRidePage() {
  return (
    <CockpitRide
      theme="spirit"
      windowVideoSrc="/videos/window/rk3_ship_cruise.mp4"
      audioSrc="/audio/spirit_ride.mp3"
      cockpitPngSrc="/images/cockpit/cockpit_frame_rk3.png"
      cockpitFit="contain"
      cockpitScale={1.0}
      cockpitOffsetY={0}
      brandMaskEnabled={true}
    />
  );
}
