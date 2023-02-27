import { OdinClient } from '@4players/odin';

export const initializeOdin = () => {
  
}

export const startOdin = async function (token) {
  try {
    console.log(token);
    // Authenticate and initialize the room
    const odinRoom = await OdinClient.initRoom(token);

    // Handle events for peers joining the room
    odinRoom.addEventListener('PeerJoined', (event) => {
      console.log(`Peer ${event.payload.peer.id} joined`);
    });

    // Handle events for peers leaving the room
    odinRoom.addEventListener('PeerLeft', (event) => {
      console.log(`Peer ${event.payload.peer.id} left`);
    });

    // Handle events for medias added by peers (e.g. start processing voice data)
    odinRoom.addEventListener('MediaStarted', (event) => {
      console.log(`Peer ${event.payload.peer.id} added media stream ${event.payload.media.id}`);
      event.payload.media.start();
    });

    // Handle events for medias removed by peers (e.g. stop processing voice data)
    odinRoom.addEventListener('MediaStopped', (event) => {
      console.log(`Peer ${event.payload.peer.id} removed media stream ${event.payload.media.id}`);
      event.payload.media.stop();
    });

    // Handle events for media activity (e.g. someone starts/stops talking)
    odinRoom.addEventListener('MediaActivity', (event) => {
      console.log(`Peer ${event.payload.peer.id} ${event.payload.active ? 'started' : 'stopped'} talking on media ${event.payload.media.id}`);
    });

    // Join the room
    await odinRoom.join();

    // Create a new audio stream for the default capture device and append it to the room
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          autoGainControl: true,
          noiseSuppression: true,
          sampleRate: 48000,
        },
      })
      .then((mediaStream) => {
        odinRoom.createMedia(mediaStream);
      });
      odinRoom.changeVolume(2)
      odinRoom.enableVolumeGate()
      
  } catch (e) {
    console.error('Something went wrong', e);
  }
}