import { first, forEach } from 'lodash';
import MeetingRepository from '../repositories/MeetingRepository';

export default class StreamTrackService {
  private meetingRepository: MeetingRepository;

  constructor() {
    this.meetingRepository = new MeetingRepository();
  }

  stop(stream: MediaStream) {
    const tracks = stream.getTracks();
    forEach(tracks, (track) => track.stop());
  }

  get isVideoEnabled() {
    const video = this.meetingRepository.getUserVideo();
    const track = video && first(video.stream.getVideoTracks());
    return Boolean(track && track.enabled);
  }

  get isAudioEnabled() {
    const video = this.meetingRepository.getUserVideo();
    const track = video && first(video.stream.getAudioTracks());
    return Boolean(track && track.enabled);
  }
}
