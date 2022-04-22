import { find, forEach } from 'lodash';
import MeetingSocket from '../pages/Meeting/Meeting.socket';
import MeetingService from './MeetingService';
import MeetingRepository from '../repositories/MeetingRepository';

export default class RTPSenderService {
  private meetingService: MeetingService;

  private meetingRepository: MeetingRepository;

  constructor() {
    this.meetingService = new MeetingService();
    this.meetingRepository = new MeetingRepository();
  }

  private publishRTCTrackReplacedSocket() {
    const meetingId = this.meetingService.getMeetingId();
    const connectionId = this.meetingService.getConnectionId();
    const video = this.meetingRepository.getVideo(connectionId);
    if (video) {
      const payload = { connectionId, kind: video.kind };
      MeetingSocket.rtpTrackReplaced.publish(meetingId, payload);
    }
  }

  replaceStream(stream: MediaStream) {
    const calls = this.meetingService.getCalls();
    forEach(calls, (call) => {
      const senders = call.peerConnection.getSenders();
      const tracks = stream.getTracks();
      const audioSender = find(senders, ({ track }) => track?.kind === 'audio');
      const videoSender = find(senders, ({ track }) => track?.kind === 'video');
      const audioTrack = find(tracks, ({ kind }) => kind === 'audio');
      const videoTrack = find(tracks, ({ kind }) => kind === 'video');
      if (audioSender && audioTrack) audioSender.replaceTrack(audioTrack);
      if (videoSender && videoTrack) videoSender.replaceTrack(videoTrack);
    });
    this.publishRTCTrackReplacedSocket();
  }
}
