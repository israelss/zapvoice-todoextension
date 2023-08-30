import {
  ExtensionMessage,
  OnInstalledListenerCallback,
  OnMessageListenerCallback,
} from "@/interfaces";

export const runtime = {
  sendMessage: (payload: ExtensionMessage) => {
    return chrome.runtime.sendMessage(payload);
  },
  onMessage: {
    addListener: (callback: OnMessageListenerCallback) => {
      return chrome.runtime.onMessage.addListener(callback);
    },
    removeListener: (callback: OnMessageListenerCallback) => {
      return chrome.runtime.onMessage.removeListener(callback);
    },
  },
  onInstalled: {
    addListener: (callback: OnInstalledListenerCallback) => {
      return chrome.runtime.onInstalled.addListener(callback);
    },
  },
  onStartup: {
    addListener: (callback: () => void) => {
      return chrome.runtime.onStartup.addListener(callback);
    },
  },
};
