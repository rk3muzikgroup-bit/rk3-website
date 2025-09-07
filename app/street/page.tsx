import CockpitRide from "../../components/CockpitRide";

export default function StreetRidePage() {
  return (
    <CockpitRide
      theme="street"
      windowVideoSrc="/videos/street_window.mp4"
      audioSrc="/audio/street_ride.mp3"
      cockpitPngSrc="/images/cockpit/cockpit_frame_rk3.png"
      cockpitFit="contain"
      cockpitScale={1.0}
      cockpitOffsetY={0}
      brandMaskEnabled={true}
    />
  );
}
