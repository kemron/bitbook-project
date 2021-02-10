import { useContext, useEffect } from "react";
import { Waterfall } from "hydrated-ws";
import { StoreContext } from "data/StoreProvider";

const WS_URL =
  process.env.REACT_APP_WS_URL || "wss://www.cryptofacilities.com/ws/v1";

interface ConnectionProviderProps {
  children: React.ReactNode;
  socketConnection?: WebSocket;
}

type Level = [price: number, size: number];

interface Payload {
  product_id: string;
  feed: string;
  asks: Level[];
  bids: Level[];
  numLevels?: number;
}

function getProductFeedPayload(socket: WebSocket, productIds: string[]) {
  const INITIATION_EVENT = {
    event: "subscribe",
    feed: "book_ui_1",
    product_ids: productIds,
  };
  return JSON.stringify(INITIATION_EVENT);
}

export default function Transport({
  children,
  socketConnection,
}: ConnectionProviderProps) {
  let connection = socketConnection;

  if (!connection) {
    connection = new Waterfall(WS_URL, undefined, {
      connectionTimeout: 3000,
    });
  }

  const { updateSnapshot, state } = useContext(StoreContext)!;

  useEffect(() => {
    const onMessage = (event: Event) => {
      // @ts-ignore
      const data = JSON.parse(event.data) as Payload;
      if (!data.feed || !data.asks || !data.bids) {
        return;
      }
      const { asks, bids } = data;
      updateSnapshot(bids, asks);
    };

    const onConnect = () => {
      if (connection) {
        connection.send(
          getProductFeedPayload(connection, [state.selectedProduct])
        );
      }
    };

    connection?.addEventListener("message", onMessage);
    connection?.addEventListener("open", onConnect);

    return () => {
      connection?.removeEventListener("message", onMessage);
      connection?.removeEventListener("open", onConnect);
    };
  }, [connection, updateSnapshot, state.selectedProduct]);

  return <>{children} </>;
}
