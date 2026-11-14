import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCloud,
  faCubes,
  faHardDrive,
  faHouseSignal,
  faMicrochip,
  faNetworkWired,
  faServer,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface HomelabItem {
  title: string;
  details: string[];
  icon: IconDefinition;
}

const links: Record<string, string> = {
  UniFi: "https://ui.com",
  Proxmox: "https://www.proxmox.com/en/products/proxmox-virtual-environment",
  "Open WebUI": "https://openwebui.com",
  Unraid: "https://unraid.net",
  "Time Machine": "https://support.apple.com/en-us/104984",
  Duplicacy: "https://duplicacy.com",
  Prometheus: "https://prometheus.io",
  Grafana: "https://grafana.com",
  Loki: "https://grafana.com/oss/loki/",
  InfluxDB: "https://www.influxdata.com",
  "Home Assistant": "https://www.home-assistant.io",
  Homebridge: "https://homebridge.io",
  Scrypted: "https://www.scrypted.app",
  Ghost: "https://ghost.org",
  "Cloudflare tunnel":
    "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
  Zoraxy: "https://zoraxy.arozos.com",
  "GitHub runners":
    "https://docs.github.com/en/actions/hosting-your-own-runners",
  Umami: "https://umami.is",
  Nextcloud: "https://nextcloud.com",
  Immich: "https://immich.app",
  "Paperless-ngx": "https://docs.paperless-ngx.com",
  FreshRSS: "https://freshrss.org",
};

const linkPattern = new RegExp(`(${Object.keys(links).join("|")})`);

function Detail({ text }: { text: string }) {
  return text.split(linkPattern).map((part, i) => {
    const href = links[part];
    if (!href) return part;
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noreferrer"
        data-umami-event={`Homelab link ${part}`}
        className="underline decoration-emerald-600/60 underline-offset-2 transition duration-300 hover:text-emerald-600"
      >
        {part}
      </a>
    );
  });
}

const stats = [
  { value: "25+", label: "VMs and LXCs" },
  { value: "72 GB", label: "VRAM, 4 GPUs" },
  { value: "512 GB", label: "8-channel DDR4" },
  { value: "100+ TB", label: "Storage" },
];

const items: HomelabItem[] = [
  {
    title: "Network",
    details: [
      "UniFi Cloud Gateway Fiber",
      "USW Pro Max 24 core switch",
      "Two U6 In-Wall Wi-Fi 6 APs",
    ],
    icon: faNetworkWired,
  },
  {
    title: "Compute",
    details: [
      "Proxmox on an Intel N100",
      "32 GB of RAM",
      "About 20 VMs and containers",
    ],
    icon: faServer,
  },
  {
    title: "Local AI",
    details: [
      "AMD EPYC, 512 GB of RAM",
      "Two RTX 3090s, two RTX 3060s",
      "72 GB of VRAM",
      "Open WebUI and local models",
    ],
    icon: faMicrochip,
  },
  {
    title: "Storage",
    details: [
      "Unraid on an Intel i5-13500",
      "9-disk array, over 100 TB",
      "NVMe and SSD cache",
      "Time Machine and Duplicacy",
    ],
    icon: faHardDrive,
  },
  {
    title: "Monitoring",
    details: ["Prometheus", "Grafana", "Loki", "InfluxDB"],
    icon: faChartLine,
  },
  {
    title: "Smart Home",
    details: ["Home Assistant", "Homebridge", "Scrypted"],
    icon: faHouseSignal,
  },
  {
    title: "Hosting",
    details: [
      "This site and my Ghost blog",
      "Cloudflare tunnel and Zoraxy",
      "Self-hosted GitHub runners",
      "Umami analytics",
    ],
    icon: faCloud,
  },
  {
    title: "Apps",
    details: ["Nextcloud", "Immich", "Paperless-ngx", "FreshRSS"],
    icon: faCubes,
  },
];

export default function Homelab() {
  return (
    <div className="z-30 mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-lg bg-slate-800/5 px-3 py-4 text-center dark:bg-white/10"
          >
            <div className="text-2xl font-bold text-emerald-600">{value}</div>
            <div className="text-sm">{label}</div>
          </div>
        ))}
      </div>
      <div
        id="homelab-list"
        className="grid grid-flow-row justify-items-center gap-6 lg:grid-cols-2"
      >
        {items.map(({ title, details, icon }) => (
          <div
            key={title}
            className="flex h-52 w-full max-w-96 flex-col rounded-lg bg-slate-800/5 p-5 dark:bg-white/10"
          >
            <h2 className="text-xl font-semibold">
              <FontAwesomeIcon className="pr-2 text-emerald-600" icon={icon} />
              {title}
            </h2>
            <ul className="list-disc space-y-1 pt-4 pl-6 text-lg">
              {details.map((detail) => (
                <li key={detail}>
                  <Detail text={detail} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
