import { useContext, useEffect, useRef } from "react";
import { Waterfall } from "hydrated-ws";
import { StoreContext } from "store";
import { Payload } from "./model";

const WS_URL =
  process.env.REACT_APP_WS_URL || "wss://www.cryptofacilities.com/ws/v1";

interface ConnectionProviderProps {
  children: React.ReactNode;
  socketConnection?: WebSocket;
}

enum ConnectionState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

type SubscriptionActionType = "subscribe" | "unsubscribe";

export function isSnapshot(data: Payload): boolean {
  return data.feed.includes("_snapshot");
}

/**
 * Dispatches a subscription to resolver
 * @param productIds
 * @param type
 */
function subscriptionAction(
  productIds: string[],
  type: SubscriptionActionType = "subscribe"
) {
  const INITIATION_EVENT = {
    event: type,
    feed: "book_ui_1",
    product_ids: productIds,
  };
  return JSON.stringify(INITIATION_EVENT);
}

export default function Transport({
  children,
  socketConnection,
}: ConnectionProviderProps) {
  const connectionRef = useRef(socketConnection);
  const isSubscribed = useRef<Boolean>(false);
  if (!connectionRef.current) {
    connectionRef.current = new Waterfall(WS_URL, undefined, {
      connectionTimeout: 3000,
    });
  }
  const connection = connectionRef.current;
  const { updateSnapshot, state } = useContext(StoreContext)!;

  useEffect(() => {
    return () => {
      connectionRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const isConnectionOpen =
      connectionRef.current?.readyState === ConnectionState.OPEN;

    if (!isSubscribed.current && isConnectionOpen) {
      connection.send(subscriptionAction([state.selectedProduct], "subscribe"));
      isSubscribed.current = true;
    }

    return () => {
      if (
        connectionRef.current?.readyState === ConnectionState.OPEN &&
        isSubscribed.current
      ) {
        connection.send(
          subscriptionAction([state.selectedProduct], "unsubscribe")
        );
        isSubscribed.current = false;
      }
    };
  }, [state.selectedProduct, connection]);

  useEffect(() => {
    const onMessage = (event: Event) => {
      // @ts-ignore
      const data = JSON.parse(event.data) as Payload;
      if (!data.feed || !data.asks || !data.bids) {
        return;
      }
      const isNewSubscription = isSnapshot(data);
      if (isNewSubscription) {
        isSubscribed.current = true;
      }

      const { asks, bids, product_id } = data;
      updateSnapshot(bids, asks, product_id, isNewSubscription);
    };

    const onConnect = () => {
      if (connection && connection.readyState === ConnectionState.OPEN) {
        connection.send(
          subscriptionAction([state.selectedProduct], "subscribe")
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
