import RoomBreathingWrapper from "@/components/RoomBreathingWrapper";

export default function MerchRoom() {
  return (
    <RoomBreathingWrapper
      color="purple"
      duration={3}
      audioSrc="/sounds/rooms/merch_ambience.mp3"
    >
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        src="/videos/rooms/merch_loop.mp4"
      />
      <div className="absolute bottom-10 left-10 text-xl text-white">
        🛍 Merch — RK3 gear, streetwear, and drops.
      </div>
    </RoomBreathingWrapper>
  );
}
