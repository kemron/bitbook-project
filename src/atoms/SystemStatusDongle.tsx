import StatusIndicator, { StatusSignal } from "./StatusIndicator";

export { StatusSignal };

type SystemStatusDongleProps = {
  status: StatusSignal;
  label: string;
};

const SystemStatusDongle = ({ status, label }: SystemStatusDongleProps) => {
  return (
    <div>
      <StatusIndicator status={status} />
      <span>{label}</span>
    </div>
  );
};

export default SystemStatusDongle;
