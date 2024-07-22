import {
    faLinkedinIn,
    faGithub,
    faXTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  
  import IconLink from "./Nav/IconLink.tsx";

export default function ExternalLinks() {
    return (

      <div className="flex justify-center space-x-4">
      <IconLink
        icon={faLinkedinIn}
        href="https://www.linkedin.com/in/remington-arneson"
      />
      <IconLink icon={faGithub} href="https://github.com/antiremy" />
      <IconLink icon={faXTwitter} href="https://twitter.com/RemingtonArn" />
    </div>
    )
}