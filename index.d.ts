import * as React from 'react';

type TrackCustomEventsArgs = {
  category: string;
  action: string;
  label: string;
  value: number;

  /**
   * https://support.google.com/analytics/answer/1033068#NonInteractionEvents
   */
  nonInteraction: boolean;

  /**
   * https://developers.google.com/analytics/devguides/collection/gtagjs/sending-data#specify_different_transport_mechanisms
   */
  transport: 'beacon' | 'xhr' | 'image';
  eventCallback: VoidFunction;
  callbackTimeout: number;
};

export const OutboundLink: React.ComponentType<
  React.HTMLProps<HTMLAnchorElement>
>;

export function trackCustomEvent(args: TrackCustomEventsArgs): void;
