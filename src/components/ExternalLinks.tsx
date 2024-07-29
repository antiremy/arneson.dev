import {
  faLinkedinIn,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import IconLink from "./IconLink.tsx";

export default function ExternalLinks() {
  return (
    <div className="flex justify-center space-x-4">
      <IconLink
        icon={faLinkedinIn}
        href="https://www.linkedin.com/in/remington-arneson"
        title="Go to LinkedIn"
        event="LinkedIn button"
      />
      <IconLink
        icon={faGithub}
        href="https://github.com/antiremy"
        title="Go to GitHub"
        event="GitHub button"
      />
      <IconLink
        icon={faXTwitter}
        href="https://twitter.com/RemingtonArn"
        title="Go to Twitter"
        event="Twitter button"
      />
    </div>
  );
}
