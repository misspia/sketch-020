export const Events = {
  // app events
  APP_LOADING: 'events/app/loading',
  APP_LOAD_COMPLETE: 'events/app/loadComplete',

  // stage events
  STAGE_LOADING: 'events/stage/loading',
  STAGE_ENTER_APP: 'events/stage/enterApp',
  STAGE_LIST: 'events/stage/list',

  // user events
  ACTIVATE_ENTRY: 'events/activateEntry',
  DEACTIVATE_ENTRY: 'events/deactivateEntry',
  MOUSE_ENTER_ENTRY: 'events/mouseEnterEntry',
  MOUSE_LEAVE_ENTRY: 'events/mouseLeaveEntry',
};

export const AppEvents = {
  STAGE_CHANGE: "app/stageChange",
};

export const WebglEvents = {
  LOADING: "event/loading",
  LOADED: "event/loaded",
  VIEW_ENTRY: "event/view-entry",
  VIEW_LIST: "event/view-list",
  MOUSEMOVE: "webgl/mousemove",
};
