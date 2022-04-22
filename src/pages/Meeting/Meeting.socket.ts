import SocketService from '../../services/SocketService';
import {
  MeetingWhiteboardDrawingsState,
  MeetingWhiteboardDrawingState,
  VideoStateKind,
} from './Meeting.state';

interface RTPTrackReplacedPayload {
  connectionId: string;
  kind: VideoStateKind;
}

export interface WhiteboardSync {
  drawings: MeetingWhiteboardDrawingsState;
  whiteboardEnabled: boolean;
}

export default {
  raiseHand: {
    channel(meetingId: string) {
      return `/raiseHand/${meetingId}`;
    },
    subscribe(meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(this.channel(meetingId), (connectionId: string) =>
        callback(connectionId),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId);
    },
  },

  conferenceCall: {
    channel(meetingId: string) {
      return `/conferenceCall/${meetingId}`;
    },
    subscribe(meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(this.channel(meetingId), (connectionId: string) =>
        callback(connectionId),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId);
    },
  },

  remoteDisconnect: {
    channel(meetingId: string) {
      return `/remoteDisconnect/${meetingId}`;
    },
    subscribe(meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(this.channel(meetingId), (connectionId: string) =>
        callback(connectionId),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId);
    },
  },

  memberRemove: {
    channel(meetingId: string) {
      return `/memberRemove/${meetingId}`;
    },
    subscribe(meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(this.channel(meetingId), (connectionId: string) =>
        callback(connectionId),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId);
    },
  },

  rtpTrackReplaced: {
    channel(meetingId: string) {
      return `/rtpTrackReplaced/${meetingId}`;
    },
    subscribe(
      meetingId: string,
      callback: (payload: RTPTrackReplacedPayload) => void,
    ) {
      SocketService.subscribe(
        this.channel(meetingId),
        (payload: RTPTrackReplacedPayload) => callback(payload),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, payload: RTPTrackReplacedPayload) {
      SocketService.publish(this.channel(meetingId), payload);
    },
  },

  whiteboardEnabled: {
    channel(meetingId: string) {
      return `/whiteboardEnabled/${meetingId}`;
    },
    subscribe(
      meetingId: string,
      callback: (whiteboardEnabled: boolean) => void,
    ) {
      SocketService.subscribe(
        this.channel(meetingId),
        (whiteboardEnabled: boolean) => callback(whiteboardEnabled),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, whiteboardEnabled: boolean) {
      SocketService.publish(this.channel(meetingId), whiteboardEnabled);
    },
  },

  whiteboardDrawingSync: {
    channel(connectionId: string) {
      return `/whiteboardDrawingSync/${connectionId}`;
    },
    subscribe(
      connectionId: string,
      callback: (whiteboardSync: WhiteboardSync) => void,
    ) {
      SocketService.subscribe(
        this.channel(connectionId),
        (whiteboardSync: WhiteboardSync) => callback(whiteboardSync),
      );
    },
    unsubscribe(connectionId: string) {
      SocketService.unsubscribe(this.channel(connectionId));
    },
    publish(connectionId: string, whiteboardSync: WhiteboardSync) {
      SocketService.publish(this.channel(connectionId), whiteboardSync);
    },
  },

  whiteboardDrawingAdd: {
    channel(meetingId: string) {
      return `/whiteboardDrawingAdd/${meetingId}`;
    },
    subscribe(
      meetingId: string,
      callback: (drawing: MeetingWhiteboardDrawingState) => void,
    ) {
      SocketService.subscribe(
        this.channel(meetingId),
        (drawing: MeetingWhiteboardDrawingState) => callback(drawing),
      );
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string, drawing: MeetingWhiteboardDrawingState) {
      SocketService.publish(this.channel(meetingId), drawing);
    },
  },

  whiteboardCanvasClear: {
    channel(meetingId: string) {
      return `/whiteboardCanvasClear/${meetingId}`;
    },
    subscribe(meetingId: string, callback: () => void) {
      SocketService.subscribe(this.channel(meetingId), callback);
    },
    unsubscribe(meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId));
    },
    publish(meetingId: string) {
      SocketService.publish(this.channel(meetingId), null);
    },
  },
};
