import { find } from 'lodash';
import store from '../store';
import { actions, selectors, VideoState } from '../pages/Meeting/Meeting.state';

export default class MeetingRepository {
  getVideo(connectionId: string): VideoState | undefined {
    const { videos } = selectors(store.getState());
    return find(videos, (video) => video.id === connectionId);
  }

  getUserVideo(): VideoState | undefined {
    const { connectionId } = selectors(store.getState());
    return this.getVideo(connectionId);
  }

  setHostVideoActive(): void {
    const { id: meetingId } = selectors(store.getState());
    store.dispatch(actions.replaceVideoActive(meetingId, true));
  }
}
