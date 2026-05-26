import { useState, useEffect } from "react";

export function Clock() {
  const [display, setDisplay] = useState("MTL --:--");

  useEffect(() => {
    function tick() {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "America/Montreal",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setDisplay("MTL " + new Intl.DateTimeFormat("en-CA", opts).format(new Date()));
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nav-clock">
      <span className="dot-blink" />
      <span id="clock">{display}</span>
    </span>
  );
}
