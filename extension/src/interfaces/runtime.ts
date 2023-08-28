import { ExtensionMessage } from ".";

export type OnMessageListenerCallback = (
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => void;

export type OnInstalledListenerCallback = (
  details: chrome.runtime.InstalledDetails,
) => void;
