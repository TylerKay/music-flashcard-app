import { useRef } from 'react';

const SoundEffect = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      try {
        await audioRef.current.play(); // Ensure it's awaited for proper error handling
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/audio/oof_sound_effect.mp3" />
      <button onClick={playSound}>Play Sound Effect</button>
    </div>
  );
};

export default SoundEffect;
