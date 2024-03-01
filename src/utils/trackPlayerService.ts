import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function playbackService() {
  try {
    TrackPlayer.addEventListener('remote-play' as any, () => {
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause' as any, () => {
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next' as any, () => {
      TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous' as any, () => {
      TrackPlayer.skipToPrevious();
    });
  } catch (error) {}
}

export async function addTracks(trackArr: any[]) {
  await TrackPlayer.add(trackArr);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function addTracksIPA(trackArr: any[]) {
  await TrackPlayer.add(trackArr);
}
