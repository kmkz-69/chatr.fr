import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export type WhiteboardActiveMenu = 'color' | 'size' | null;
export interface WhiteboardState {
  activeMenu: WhiteboardActiveMenu;
  brushSize: string;
  brushColor: string;
}

export interface WhiteboardActions {
  replaceActiveMenu: (activeMenu: WhiteboardActiveMenu) => AnyAction;
  replaceSize(size: string): AnyAction;
  replaceColor(color: string): AnyAction;
}

const whiteboard: WhiteboardState = {
  activeMenu: null,
  brushSize: '1',
  brushColor: '#000000',
};

export const actions: WhiteboardActions = {
  replaceActiveMenu(activeMenu) {
    return { type: 'REPLACE_WHITEBOARD_ACTIVE_MENU', activeMenu };
  },
  replaceSize(brushSize) {
    return { type: 'REPLACE_WHITEBOARD_BRUSH_SIZE', brushSize };
  },
  replaceColor(brushColor) {
    return { type: 'REPLACE_WHITEBOARD_BRUSH_COLOR', brushColor };
  },
};

export function reducers(state = whiteboard, action: any) {
  switch (action.type) {
    case 'REPLACE_WHITEBOARD_ACTIVE_MENU':
      whiteboard.activeMenu = action.activeMenu;
      return cloneDeep(whiteboard);
    case 'REPLACE_WHITEBOARD_BRUSH_SIZE':
      whiteboard.brushSize = action.brushSize;
      return cloneDeep(whiteboard);
    case 'REPLACE_WHITEBOARD_BRUSH_COLOR':
      whiteboard.brushColor = action.brushColor;
      return cloneDeep(whiteboard);
    default:
      return state;
  }
}

export function selectors(state: { whiteboard: WhiteboardState }) {
  return cloneDeep(state.whiteboard);
}
