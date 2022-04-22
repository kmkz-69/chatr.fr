import { some } from 'lodash';
import { nanoid } from 'nanoid';
import store from '../store';
import MeetingService from './MeetingService';
import StreamTrackService from './StreamTrackService';
import MeetingRepository from '../repositories/MeetingRepository';
import {
  actions as meetingActions,
  selectors as meetingSelectors,
  VideoState,
  VideoStateKind,
} from '../pages/Meeting/Meeting.state';

type createVideoCallback = (video: VideoState) => void;

export default class VideoService {
  protected meetingService: MeetingService;

  private streamTrackService: StreamTrackService;

  private meetingRepository: MeetingRepository;

  constructor() {
    this.meetingService = new MeetingService();
    this.streamTrackService = new StreamTrackService();
    this.meetingRepository = new MeetingRepository();
  }

  hasVideo(connectionId: string): boolean {
    const { videos } = meetingSelectors(store.getState());
    return some(videos, { id: connectionId });
  }

  private createVideo(
    connectionId: string,
    stream: MediaStream,
    kind: VideoStateKind,
    callback: createVideoCallback,
  ): void {
    const muted = this.meetingService.isUserMeeting(connectionId);
    const video = {
      id: connectionId,
      stream,
      kind,
      raiseHand: false,
      memberRemove: this.meetingService.canMemberRemove(connectionId),
      active: this.meetingService.isHostMeeting(connectionId),
      muted,
      streamMuted: {
        video: false,
        audio: false,
      },
      renderId: nanoid(),
    };
    callback(video);
  }

  createMediaVideo(
    connectionId: string,
    stream: MediaStream,
    callback: createVideoCallback,
  ): void {
    this.createVideo(connectionId, stream, 'media', callback);
  }

  pushVideo(video: VideoState): void {
    store.dispatch(meetingActions.pushVideo(video));
    setTimeout(() => {
      store.dispatch(meetingActions.updateVideoRenderId(video.id));
    }, 300);
  }

  pullVideo(connectionId: string): void {
    store.dispatch(meetingActions.pullVideo(connectionId));
  }

  stopUserVideo() {
    const userVideo = this.meetingRepository.getUserVideo();
    if (userVideo) this.streamTrackService.stop(userVideo.stream);
  }

  replaceUserStream(stream: MediaStream, kind: VideoStateKind) {
    const { connectionId } = meetingSelectors(store.getState());
    store.dispatch(meetingActions.replaceVideoKind(connectionId, kind));
    store.dispatch(meetingActions.replaceVideoStream(connectionId, stream));
  }
}
