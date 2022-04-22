import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export interface PrivacyState {
  privacy: string;
}

export interface PrivacyActions {
  replacePrivacy(privacy: string): AnyAction;
}

const privacy: PrivacyState = {
  privacy: '',
};

export const actions: PrivacyActions = {
  replacePrivacy(privacy) {
    return { type: 'REPLACE_PRIVACY_PRIVACY', privacy };
  },
};

export function reducers(state = privacy, action: any) {
  switch (action.type) {
    case 'REPLACE_PRIVACY_PRIVACY':
      privacy.privacy = action.privacy;
      return cloneDeep(privacy);
    default:
      return state;
  }
}

export function selectors(state: { privacy: PrivacyState }) {
  return cloneDeep(state.privacy);
}
