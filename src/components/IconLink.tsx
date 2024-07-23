import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconLinkProps {
  icon: IconProp;
  href: string;
  title: string;
}

export default function IconLink(props: IconLinkProps) {
  return (
    <a href={props.href} target="_blank" title={props.title}>
      <div className="size-12 text-3xl border-2 flex justify-center items-center border-black dark:border-white rounded-md">
        <FontAwesomeIcon icon={props.icon} className="p-1"/>
      </div>
    </a>
  );
}
