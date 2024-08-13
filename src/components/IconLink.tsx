import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconLinkProps {
  icon: IconProp;
  href: string;
  title: string;
  event: string;
}

export default function IconLink(props: IconLinkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      title={props.title}
      data-umami-event={props.event}
    >
      <div className="flex size-12 items-center justify-center rounded-md border-2 border-black text-3xl dark:border-white">
        <FontAwesomeIcon icon={props.icon} className="p-1" />
      </div>
    </a>
  );
}
