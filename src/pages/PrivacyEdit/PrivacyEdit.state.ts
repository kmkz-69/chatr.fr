import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export interface PrivacyEditState {
  privacy: string;
}

export interface PrivacyEditActions {
  replacePrivacy(privacy: string): AnyAction;
}

const privacyEdit: PrivacyEditState = {
  privacy: '',
};

export const actions: PrivacyEditActions = {
  replacePrivacy(privacy) {
    return { type: 'REPLACE_PRIVACY_EDIT_PRIVACY', privacy };
  },
};

export function reducers(state = privacyEdit, action: any) {
  switch (action.type) {
    case 'REPLACE_PRIVACY_EDIT_PRIVACY':
      privacyEdit.privacy = action.privacy;
      return cloneDeep(privacyEdit);
    default:
      return state;
  }
}

export function selectors(state: { privacyEdit: PrivacyEditState }) {
  return cloneDeep(state.privacyEdit);
}
