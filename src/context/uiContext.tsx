import React, { ReactNode } from "react";
export interface State {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displaySidebarMobile: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  modalView: any[];
  modalData: any;
  drawerView: string | null;
  toastText: string;
  user: object | null;
  isFetching?: boolean;
  modalFixed?: boolean;
  modalCloseButton?: boolean;
}

const initialState = {
  isAuthorized: false,
  displaySidebar: false,
  displaySidebarMobile: false,
  displayFilter: false,
  displayModal: false,
  modalView: [],
  drawerView: null,
  modalData: {},
  toastText: "",
  user: null,
  isFetching: false,
  modalFixed: true,
  modalCloseButton: true,
};
type DRAWER_VIEWS = "MOBILE_MENU" | "MOBILE_SETTING";
type ToastText = string;

type Action =
  | {
      type: "SET_AUTHORIZED";
      user: any;
    }
  | {
      type: "SET_UNAUTHORIZED";
    }
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "OPEN_SIDEBAR_MOBILE";
    }
  | {
      type: "CLOSE_SIDEBAR_MOBILE";
    }
  | {
      type: "SET_FETCHING";
      status: boolean;
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: any;
    }
  | {
      type: "SET_MODAL_DATA";
      data: any;
    };

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_AUTHORIZED": {
      return {
        ...state,
        isAuthorized: true,
        user: action.user,
      };
    }
    case "SET_UNAUTHORIZED": {
      return {
        ...state,
        isAuthorized: false,
        user: null,
      };
    }
    case "SET_FETCHING": {
      return {
        ...state,
        isFetching: action.status,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case "OPEN_SIDEBAR_MOBILE": {
      return {
        ...state,
        displaySidebarMobile: true,
      };
    }
    case "CLOSE_SIDEBAR_MOBILE": {
      return {
        ...state,
        displaySidebarMobile: false,
        drawerView: null,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      const updateView = state.modalView.slice(0, -1);
      const isOpen = updateView.length == 0 ? false : true;
      const currentView = state.modalView.slice(-1)[0];
      const obj = { ...state.modalData };
      delete obj[currentView];
      return {
        ...state,
        displayModal: isOpen,
        modalView: updateView,
        modalData: obj,
      };
    }
    case "SET_MODAL_VIEW": {
      const updateView = [...state.modalView];
      updateView.push(action.view);
      return {
        ...state,
        modalView: updateView,
      };
    }

    case "SET_MODAL_DATA": {
      const currentView = state.modalView.slice(-1)[0];
      const obj = { ...state.modalData };
      obj[currentView] = action.data;
      return {
        ...state,
        modalData: obj,
      };
    }
  }
}

export const UIProvider: React.FC<any> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const unauthorize = () => dispatch({ type: "SET_UNAUTHORIZED" });
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const openSidebarMobile = () => dispatch({ type: "OPEN_SIDEBAR_MOBILE" });
  const closeSidebarMobile = () => dispatch({ type: "CLOSE_SIDEBAR_MOBILE" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const toggleSidebarMobile = () =>
    state.displaySidebarMobile
      ? dispatch({ type: "CLOSE_SIDEBAR_MOBILE" })
      : dispatch({ type: "OPEN_SIDEBAR_MOBILE" });
  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const setModalView = (view: any) =>
    dispatch({ type: "SET_MODAL_VIEW", view });
  const setModalData = (data: any) => {
    console.log("data", data);
    dispatch({ type: "SET_MODAL_DATA", data });
  };

  const value = React.useMemo(
    () => ({
      ...state,
      unauthorize,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      openModal,
      closeModal,
      setModalView,
      setModalData,
      toggleSidebarMobile,
      openSidebarMobile,
      closeSidebarMobile,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
interface BaseLayoutProps {
  children?: ReactNode;
}

export const ManagedUIContext: React.FC<BaseLayoutProps> = ({ children }) => {
  return <UIProvider>{children}</UIProvider>;
};
