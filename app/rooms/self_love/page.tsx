import RoomBreathingWrapper from "@/components/RoomBreathingWrapper";

export default function SelfLoveRoom() {
  return (
    <RoomBreathingWrapper
      color="pink"
      duration={7}
      audioSrc="/sounds/rooms/selflove_ambience.mp3"
    >
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        src="/videos/rooms/selflove_loop.mp4"
      />
      <div className="absolute bottom-10 left-10 text-xl text-white">
        💖 Self Love — Affirmations, inner healing, and balance.
      </div>
    </RoomBreathingWrapper>
  );
}
