import { Helmet } from "react-helmet";

export default function Homelab() {
  return (
    <div className="w-full justify-center flex flex-wrap mt-20">
      <Helmet>
        <title>Homelab | Remington</title>
      </Helmet>
      <div className="lg:w-1/2 max-w-xl">
        <div className="text-2xl font-bold font-white">My homelab</div>
        <div className="text-base mt-4 mb-8">
          I have a "small" 22U server rack in my closet that I use to host
          services (including this website!) and learn new technologies.
        </div>
        <hr className="h-[1px] bg-white opacity-10 mb-8" />
        <div className="font-semibold pb-2 text-lg flex flex-row items-center justify-start w-full">
          Unraid Server
        </div>
        <div className="text-sm">
          <ul>
            <li>Motherboard: MSI X99A SLI PLUS</li>
            <li>Memory: 4 x 32GB (128GB Total) DDR4 @ 2400MHz</li>
            <li>CPU: Intel Core i7-6950X @ 3.00GHz</li>
            <li>GPU: NVIDIA GeForce RTX 3060</li>
          </ul>
          <div className="mt-4">
            <span className="font-semibold text-base">Dockers</span>
            <div className="mt-4">
              Networking
              <ul className="list-disc ml-[14px]">
                <li>
                  <span className="font-semibold">cloudflared</span> - Allows me
                  to tunnel traffic from Cloudflare's servers to Nginx Proxy
                  Manager. Prevents me from needing to expose my home IP or open
                  ports for hosting services.
                </li>
                <li>
                  <span className="font-semibold">Nginx Proxy Manager</span> - A
                  very nice UI that creates Nginx configurations for proxying
                  domains to other Docker containers or hosts on my network.
                  It's also able to handle caching free certificate renewals,
                  although Cloudflare takes care of both for me now.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              Analytics
              <ul className="list-disc ml-[14px]">
                <li>
                  <span className="font-semibold">Grafana</span> - The best
                  software to quickly build dashboards. Having said that, I
                  simply use the prebuilt Ultimate Unraid Dashboard v2 to keep
                  tabs on my server.
                </li>
                <li>
                  <span className="font-semibold">Telegraf</span> - Lightweight
                  tool to feed server metrics into InfluxDB.
                </li>
                <li>
                  <span className="font-semibold">Glances</span> - Another
                  utility that allows me to quickly see server metrics in my
                  browser. Also provides an API that opens up monitoring for
                  Home Assistant. Light(er)weight when compared to Netdata
                </li>
                <li>
                  <span className="font-semibold">Uptime Kuma</span> - A neat
                  service that is able to send a variety of different requests
                  for health checking other services on my network. It's able to
                  send notifications when things go down.
                </li>
                <li>
                  <span className="font-semibold">Umami</span> - A
                  GDPR-compliant web analytics tool. Only used on this site so I
                  can keep track of traffic
                </li>
                <li>
                  <span className="font-semibold">
                    GoAccess for Nginx Proxy Manager Logs
                  </span>{" "}
                  - Purpose built tool to quickly parse all NPM logs and present
                  them in various visualizations. Makes it easier to see what's
                  going on with my domains.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              Databases
              <ul className="list-disc ml-[14px]">
                <li>
                  <span className="font-semibold">Redis</span> - In-memory
                  key-value database used for extremely fast data retrieval
                </li>
                <li>
                  <span className="font-semibold">PostgreSQL</span> - Not my
                  personal favorite flavor of SQL but some services require it
                </li>
                <li>
                  <span className="font-semibold">MariaDB</span> - My favorite
                  flavor of SQL for small projects; supporting container
                  required by others
                </li>
                <li>
                  <span className="font-semibold">InfluxDB</span> - Used to
                  store data for Grafana; impressively fast for how much data it
                  stores
                </li>
                <li>
                  <span className="font-semibold">Chronograf</span> - Web tool
                  to query from InfluxDB
                </li>
              </ul>
            </div>
            <div className="mt-4">
              Utilities
              <ul className="list-disc ml-[14px]">
                <li>
                  <span className="font-semibold">Tandoor Recipes</span> - Very
                  nice tool to rip the recipes without the long story before
                  from a website and stores it for future use
                </li>
                <li>
                  <span className="font-semibold">Assetto Corsa Server</span> -
                  A very well done Assetto Corsa server container that includes
                  tools to manage it from the web. You can see it at{" "}
                  <a href="https://ac.remy.lol">https://ac.remy.lol</a>
                </li>
                <li>
                  <span className="font-semibold">iPerf3</span> - Small tool to
                  measure network speed to my server. There are lots of
                  compatiable apps for almost every device
                </li>
                <li>
                  <span className="font-semibold">Reactive Resume</span> - Nice
                  utility that lets you input information for your resume and
                  applies it to different templates for you. Stores everything
                  for later use
                </li>
                <li>
                  <span className="font-semibold">
                    iCloud Photos Downloader (icloudpd)
                  </span>{" "}
                  - Utility that downloads all images from my iCloud account
                  nightly
                </li>
              </ul>
            </div>
          </div>
          <div className="text-sm mt-10 mb-4">Last Updated: May 17th, 2023</div>
        </div>
      </div>
    </div>
  );
}
