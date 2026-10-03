"use client";

import DisintegrateOnScroll from "./DisintegrateOnScroll";
import "./disintegrate-on-scroll-demo.css";

export default function DisintegrateOnScrollDemo() {
  return (
    <>
      <DisintegrateOnScroll
        options={{
          pinDistance: 1400,
          particleGap: 2,
          windDistance: 680,
          turbulence: 85,
          lift: 80,
          particleSize: 1,
          stagger: 0.18,
        }}
        className="dosc-demo-hero"
      >
        <div className="dosc-demo-live">
          <span />
          LIVE DEMO
        </div>

        <div className="dosc-demo-center">
          <h1>
            Watch it <em>think</em>, live.
          </h1>

          <p>
            Every model call and tool call streams to the browser over SSE,
            in real time. Bring your own DeepSeek key — it never touches
            our server.
          </p>

          <button type="button">
            OPEN THE DEMO →
          </button>
        </div>
      </DisintegrateOnScroll>

      <section className="dosc-demo-next">
        <span>01 / NEXT</span>
        <h2>
          The interface
          <br />
          becomes dust.
        </h2>
      </section>
    </>
  );
}
