import { AnyAction } from 'redux';
import { cloneDeep, find, findIndex, map, pull, reject, some } from 'lodash';
import { nanoid } from 'nanoid';
import { MediaConnection } from 'peerjs';
import { fabric } from 'fabric';
import { MenuPosition } from '../../components/Menu/Menu';

export type VideoStateKind = 'media' | 'screen';
export type MeetingWhiteboardDrawingState = fabric.Object;
export type MeetingWhiteboardDrawingsState = MeetingWhiteboardDrawingState[];
export type MenuExpandedState = MenuPosition[];

interface VideoStateStreamMuted {
  video: boolean;
  audio: boolean;
}

export interface VideoState {
  id: string;
  stream: MediaStream;
  kind: VideoStateKind;
  raiseHand: boolean;
  memberRemove: boolean;
  active: boolean;
  muted: boolean;
  streamMuted: VideoStateStreamMuted;
  renderId: string;
}

export interface MeetingState {
  id: string;
  connectionId: string;
  videos: VideoState[];
  mediaStream: MediaStream;
  screenStream: MediaStream;
  calls: MediaConnection[];
  whiteboardDrawings: MeetingWhiteboardDrawingsState;
  whiteboardEnabled: boolean;
  menuExpanded: MenuExpandedState;
}

export interface MeetingActions {
  replaceId: (id: string) => AnyAction;
  replaceConnectionId: (connectionId: string) => AnyAction;
  replaceVideos: (videos: VideoState[]) => AnyAction;
  replaceMediaStream: (mediaStream: MediaStream) => AnyAction;
  replaceScreenStream: (screenStream: MediaStream) => AnyAction;
  replaceVideoStream: (connectionId: string, stream: MediaStream) => AnyAction;
  replaceVideoKind: (connectionId: string, kind: VideoStateKind) => AnyAction;
  replaceVideoRaiseHand: (
    connectionId: string,
    raiseHand: boolean,
  ) => AnyAction;
  replaceVideoActive: (connectionId: string, active: boolean) => AnyAction;
  replaceWhiteboardDrawings: (
    whiteboardDrawings: MeetingWhiteboardDrawingsState,
  ) => AnyAction;
  replaceWhiteboardEnabled: (enabled: boolean) => AnyAction;
  replaceVideoStreamMutedVideo: (
    connectionId: string,
    muted: boolean,
  ) => AnyAction;
  replaceVideoStreamMutedAudio: (
    connectionId: string,
    muted: boolean,
  ) => AnyAction;
  updateVideoRenderId: (connectionId: string) => AnyAction;
  pushVideo: (video: VideoState) => AnyAction;
  pushCall: (call: MediaConnection) => AnyAction;
  pushWhiteboardDrawing: (
    whiteboardDrawing: MeetingWhiteboardDrawingState,
  ) => AnyAction;
  pushMenuExpanded: (menuExpanded: MenuPosition) => AnyAction;
  pullVideo: (connectionId: string) => AnyAction;
  pullMenuExpanded: (menuExpanded: MenuPosition) => AnyAction;
  reset: () => AnyAction;
}

const meeting: MeetingState = {
  id: '',
  connectionId: '',
  videos: [],
  mediaStream: new MediaStream(),
  screenStream: new MediaStream(),
  calls: [],
  whiteboardDrawings: [],
  whiteboardEnabled: false,
  menuExpanded: ['top', 'bottom'],
};

export const actions: MeetingActions = {
  replaceId(id) {
    return { type: 'REPLACE_MEETING_ID', id };
  },
  replaceConnectionId(connectionId) {
    return { type: 'REPLACE_MEETING_CONNECTION_ID', connectionId };
  },
  replaceVideos(videos) {
    return { type: 'REPLACE_MEETING_VIDEOS', videos };
  },
  replaceMediaStream(mediaStream) {
    return { type: 'REPLACE_MEETING_MEDIA_STREAM', mediaStream };
  },
  replaceScreenStream(screenStream) {
    return { type: 'REPLACE_MEETING_SCREEN_STREAM', screenStream };
  },
  replaceVideoStream(connectionId, stream) {
    const payload = { connectionId, stream };
    return { type: 'REPLACE_MEETING_VIDEO_STREAM', payload };
  },
  replaceVideoKind(connectionId, kind) {
    const payload = { connectionId, kind };
    return { type: 'REPLACE_MEETING_VIDEO_KIND', payload };
  },
  replaceVideoRaiseHand(connectionId, raiseHand) {
    const payload = { connectionId, raiseHand };
    return { type: 'REPLACE_MEETING_VIDEO_RAISE_HAND', payload };
  },
  replaceVideoActive(connectionId, active) {
    const payload = { connectionId, active };
    return { type: 'REPLACE_MEETING_VIDEO_ACTIVE', payload };
  },
  replaceWhiteboardDrawings(whiteboardDrawings) {
    return { type: 'REPLACE_MEETING_WHITEBOARD_DRAWINGS', whiteboardDrawings };
  },
  replaceWhiteboardEnabled(enabled) {
    return { type: 'REPLACE_MEETING_WHITEBOARD_ENABLED', enabled };
  },
  replaceVideoStreamMutedVideo(connectionId, muted) {
    const payload = { connectionId, muted };
    return { type: 'REPLACE_MEETING_VIDEO_STREAM_MUTED_VIDEO', payload };
  },
  replaceVideoStreamMutedAudio(connectionId, muted) {
    const payload = { connectionId, muted };
    return { type: 'REPLACE_MEETING_VIDEO_STREAM_MUTED_AUDIO', payload };
  },
  updateVideoRenderId(connectionId) {
    return { type: 'UPDATE_MEETING_VIDEO_RENDER_ID', connectionId };
  },
  pushVideo(video) {
    return { type: 'PUSH_MEETING_VIDEO', video };
  },
  pushCall(call) {
    return { type: 'PUSH_MEETING_CALL', call };
  },
  pushWhiteboardDrawing(whiteboardDrawing) {
    return { type: 'PUSH_MEETING_WHITEBOARD_DRAWING', whiteboardDrawing };
  },
  pushMenuExpanded(menuExpanded) {
    return { type: 'PUSH_MEETING_MENU_EXPANDED', menuExpanded };
  },
  pullVideo(connectionId) {
    return { type: 'PULL_MEETING_VIDEO', connectionId };
  },
  pullMenuExpanded(menuExpanded) {
    return { type: 'PULL_MEETING_MENU_EXPANDED', menuExpanded };
  },
  reset() {
    return { type: 'RESET_MEETING' };
  },
};

export function reducers(state = meeting, action: any) {
  switch (action.type) {
    case 'REPLACE_MEETING_ID':
      meeting.id = action.id;
      return cloneDeep(meeting);
    case 'REPLACE_MEETING_CONNECTION_ID':
      meeting.connectionId = action.connectionId;
      return cloneDeep(meeting);
    case 'REPLACE_MEETING_VIDEOS':
      meeting.videos = action.videos;
      return cloneDeep(meeting);
    case 'REPLACE_MEETING_MEDIA_STREAM': {
      meeting.mediaStream = action.mediaStream;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_SCREEN_STREAM': {
      meeting.screenStream = action.screenStream;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_STREAM': {
      const { connectionId, stream } = action.payload;
      const video = find(meeting.videos, { id: connectionId });
      if (video) video.stream = stream;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_KIND': {
      const { connectionId, kind } = action.payload;
      const video = find(meeting.videos, { id: connectionId });
      if (video) video.kind = kind;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_RAISE_HAND': {
      const { connectionId, raiseHand } = action.payload;
      const video = find(meeting.videos, { id: connectionId });
      if (video) video.raiseHand = raiseHand;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_ACTIVE': {
      const { connectionId, active } = action.payload;
      const activeVideo = find(meeting.videos, { active });
      const targetVideo = find(meeting.videos, { id: connectionId });
      if (activeVideo) activeVideo.active = !active;
      if (targetVideo) targetVideo.active = active;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_WHITEBOARD_DRAWINGS':
      meeting.whiteboardDrawings = action.whiteboardDrawings;
      return cloneDeep(meeting);
    case 'REPLACE_MEETING_WHITEBOARD_ENABLED': {
      meeting.whiteboardEnabled = action.enabled;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_STREAM_MUTED_VIDEO': {
      const { connectionId: id, muted } = action.payload;
      const video = find(meeting.videos, { id });
      if (video) video.streamMuted.video = muted;
      return cloneDeep(meeting);
    }
    case 'REPLACE_MEETING_VIDEO_STREAM_MUTED_AUDIO': {
      const { connectionId: id, muted } = action.payload;
      const video = find(meeting.videos, { id });
      if (video) video.streamMuted.audio = muted;
      return cloneDeep(meeting);
    }
    case 'UPDATE_MEETING_VIDEO_RENDER_ID': {
      const { connectionId: id } = action;
      const video = find(meeting.videos, { id });
      if (video) video.renderId = nanoid();
      return cloneDeep(meeting);
    }
    case 'PUSH_MEETING_VIDEO': {
      const isExists = some(meeting.videos, { id: action.video.id });
      if (!isExists) meeting.videos.push(action.video);
      return cloneDeep(meeting);
    }
    case 'PUSH_MEETING_CALL': {
      meeting.calls.push(action.call);
      return cloneDeep(meeting);
    }
    case 'PUSH_MEETING_WHITEBOARD_DRAWING': {
      const stringifyDrawing = (drawing: MeetingWhiteboardDrawingState) =>
        JSON.stringify(drawing);
      const { whiteboardDrawing } = action;
      const drawings = map(meeting.whiteboardDrawings, stringifyDrawing);
      const existingIndex = findIndex(drawings, (drawing) => {
        return drawing === JSON.stringify(whiteboardDrawing);
      });
      const isExists = existingIndex >= 0;
      if (!isExists) meeting.whiteboardDrawings.push(whiteboardDrawing);
      return cloneDeep(meeting);
    }
    case 'PUSH_MEETING_MENU_EXPANDED':
      meeting.menuExpanded.push(action.menuExpanded);
      return cloneDeep(meeting);
    case 'PULL_MEETING_VIDEO': {
      const { connectionId: id } = action;
      const isExists = some(meeting.videos, { id });
      if (isExists) {
        meeting.videos = reject(meeting.videos, { id });
      }
      return cloneDeep(meeting);
    }
    case 'PULL_MEETING_MENU_EXPANDED':
      pull(meeting.menuExpanded, action.menuExpanded);
      return cloneDeep(meeting);
    case 'RESET_MEETING': {
      meeting.id = '';
      meeting.connectionId = '';
      meeting.videos = [];
      meeting.menuExpanded = ['top', 'bottom'];
      return cloneDeep(meeting);
    }
    default:
      return state;
  }
}

export function selectors(state: { meeting: MeetingState }) {
  return cloneDeep(state.meeting);
}
