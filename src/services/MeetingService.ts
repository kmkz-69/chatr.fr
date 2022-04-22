import { some } from 'lodash';
import { MediaConnection } from 'peerjs';
import store from '../store';
import AuthService from './AuthService';
import {
  actions as meetingActions,
  selectors as meetingSelectors,
} from '../pages/Meeting/Meeting.state';

export default class MeetingService {
  protected authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  protected setMeetingId(meetingId: string): void {
    if (this.authService.isHostAuth()) {
      store.dispatch(meetingActions.replaceId(meetingId));
    }
  }

  protected setConnectionId(connectionId: string): void {
    store.dispatch(meetingActions.replaceConnectionId(connectionId));
  }

  isExistsUserVideo(connectionId: string) {
    const { videos } = meetingSelectors(store.getState());
    const existsUserVideo = some(videos, { id: connectionId });
    return existsUserVideo;
  }

  setId(connectionId: string, callback: (meetingId: string) => void): void {
    this.setMeetingId(connectionId);
    this.setConnectionId(connectionId);
    const meetingId = this.getMeetingId();
    callback(meetingId);
  }

  setMediaStream(mediaStream: MediaStream) {
    store.dispatch(meetingActions.replaceMediaStream(mediaStream));
  }

  setScreenStream(screenStream: MediaStream) {
    store.dispatch(meetingActions.replaceScreenStream(screenStream));
  }

  getMediaStream() {
    return meetingSelectors(store.getState()).mediaStream;
  }

  getScreenStream() {
    return meetingSelectors(store.getState()).screenStream;
  }

  getMeetingId(): string {
    return meetingSelectors(store.getState()).id;
  }

  getConnectionId(): string {
    return meetingSelectors(store.getState()).connectionId;
  }

  getCalls(): MediaConnection[] {
    return meetingSelectors(store.getState()).calls;
  }

  isHostMeeting(connectionId: string): boolean {
    const { id: meetingId } = meetingSelectors(store.getState());
    return meetingId === connectionId;
  }

  isMemberMeeting(connectionId: string): boolean {
    return !this.isHostMeeting(connectionId);
  }

  isUserMeeting(connectionId: string): boolean {
    const { connectionId: id } = meetingSelectors(store.getState());
    return connectionId === id;
  }

  canMemberRemove(connectionId: string): boolean {
    return this.authService.isHostAuth() && !this.isHostMeeting(connectionId);
  }

  canConferenceCall(connectionId: string) {
    return (
      !this.isHostMeeting(connectionId) && !this.isExistsUserVideo(connectionId)
    );
  }

  resetMeeting(): void {
    store.dispatch(meetingActions.reset());
  }

  pushCall(call: MediaConnection): void {
    store.dispatch(meetingActions.pushCall(call));
  }
}
