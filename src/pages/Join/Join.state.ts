import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';
import { actions as meetingActions } from '../Meeting/Meeting.state';

export interface JoinState {
  meetingId: string;
}

export interface JoinActions {
  replaceMeetingId: (meetingId: string) => AnyAction;
  replaceMeetingMeetingId: (meetingId: string) => AnyAction;
}

const join: JoinState = {
  meetingId: '',
};

export const actions: JoinActions = {
  replaceMeetingId(meetingId) {
    return { type: 'REPLACE_JOIN_MEETING_ID', meetingId };
  },
  replaceMeetingMeetingId(meetingId) {
    return meetingActions.replaceId(meetingId);
  },
};

export function reducers(state = join, action: any) {
  switch (action.type) {
    case 'REPLACE_JOIN_MEETING_ID':
      join.meetingId = action.meetingId;
      return cloneDeep(join);
    default:
      return state;
  }
}

export function selectors(state: { join: JoinState }) {
  return cloneDeep(state.join);
}
