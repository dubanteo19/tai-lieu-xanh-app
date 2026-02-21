import { useEffect, useState } from "react";
interface Notification {
  id: number;
  message: string;
}
export const SseListener = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [current, setCurrent] = useState<Notification | null>(null);

  useEffect(() => {
    const SSE_URL = "http://localhost:8080/api/v1/sse/subscribe";
    const eventSource = new EventSource(SSE_URL);
    eventSource.addEventListener("global-message", (event) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message: event.data }]);
    });
    eventSource.onerror = (err) => {
      console.log("SSE error", err);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);
  useEffect(() => {
    if (!current && notifications.length > 0) {
      setCurrent(notifications[0]);
      setNotifications((prev) => prev.slice(1));
    }
  }, [notifications, current]);
  return (
    <div className="pointer-events-none fixed top-0 z-[9999] w-full overflow-hidden bg-gradient-to-r from-[#1a1208] via-[#3a250f] to-[#1a1208] border-b border-yellow-500/30">
      {current && (
        <div
          key={current.id} // IMPORTANT: restart animation
          onAnimationEnd={() => {
            setCurrent(null);
          }}
          className="
          animate-rk-marquee
          whitespace-nowrap
          py-2
          text-sm
          font-semibold
          text-yellow-300
          drop-shadow-[0_0_6px_rgba(255,200,80,0.6)]
        "
        >
          🏰 {current.message}
        </div>
      )}
    </div>
  );
};
