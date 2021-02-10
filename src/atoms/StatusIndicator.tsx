import styled from "@emotion/styled";

import theme from "./theme";

export enum StatusSignal {
  Disconnected = "Disconnected",
  Good = "Good",
  Error = "Error",
  Connecting = "Reconnecting",
}

const COLOR_MAP = {
  [StatusSignal.Good]: theme.palette.midGreen,
  [StatusSignal.Error]: theme.palette.cherryRed,
  [StatusSignal.Disconnected]: theme.palette.stableWhite,
  [StatusSignal.Connecting]: theme.palette.sunYellow,
};

interface StatusIndicatorProps {
  status?: StatusSignal;
  pulse?: boolean;
}

const DEFAULT_STATUS = StatusSignal.Disconnected;

const StatusIndicator = styled.div<StatusIndicatorProps>`
  min-width: 15px;
  min-height: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => COLOR_MAP[status ?? DEFAULT_STATUS]};
`;

export default StatusIndicator;
