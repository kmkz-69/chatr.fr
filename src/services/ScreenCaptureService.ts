import { forEach } from 'lodash';
import AlertService from './AlertService';
import MeetingService from './MeetingService';
import MediaService from './MediaService';

export default class ScreenCaptureService {
  private contraints = {
    video: true,
    audio: true,
  };

  private meetingService: MeetingService;

  private mediaService: MediaService;

  constructor() {
    this.meetingService = new MeetingService();
    this.mediaService = new MediaService();
  }

  private handleDisplayMediaError(error: any) {
    const messages: any = {
      'Permission denied by system': 'Permission denied by system',
      'Permission denied': null,
      // '*': 'Device does not support screen capture',
      '*': 'Could not start audio source',
    };
    const message = messages[error.message];
    const wildcardMessage = message === undefined ? messages['*'] : message;
    const suppressMessage = wildcardMessage !== null && wildcardMessage;
    if (suppressMessage) AlertService.push(suppressMessage);
  }

  private async attachAudioTracks(screenStream: MediaStream) {
    await this.mediaService.getAudioStream((audioStream) => {
      const audioTracks = audioStream.getAudioTracks();
      forEach(audioTracks, (track) => screenStream.addTrack(track));
    });
  }

  async getStream(
    callback: (screenStream: MediaStream) => void,
  ): Promise<void> {
    try {
      const screenStream: MediaStream =
        await navigator.mediaDevices.getDisplayMedia(this.contraints);
      await this.attachAudioTracks(screenStream);
      this.meetingService.setScreenStream(screenStream);
      callback(screenStream);
    } catch (error) {
      this.handleDisplayMediaError(error);
    }
  }
}
