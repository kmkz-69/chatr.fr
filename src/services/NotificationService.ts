import { Howl } from 'howler';
import AuthService from './AuthService';
import MeetingService from './MeetingService';

export default class NotificationService {
  protected authService: AuthService;

  protected meetingService: MeetingService;

  constructor() {
    this.authService = new AuthService();
    this.meetingService = new MeetingService();
  }

  private canNotifyHost(connectionId: string) {
    const isHostAuth = this.authService.isHostAuth();
    const isExistsUserVideo =
      this.meetingService.isExistsUserVideo(connectionId);
    return isHostAuth && !isExistsUserVideo;
  }

  private canNotifyMember(connectionId: string) {
    return !this.meetingService.isExistsUserVideo(connectionId);
  }

  private playNotification() {
    const notification = new Howl({ src: ['/assets/notification.mp3'] });
    notification.play();
  }

  notifyHost(connectionId: string) {
    if (this.canNotifyHost(connectionId)) this.playNotification();
  }

  notifyMember(connectionId: string) {
    if (this.canNotifyMember(connectionId)) this.playNotification();
  }
}
