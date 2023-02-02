import React from "react";
import ReactDOM from "react-dom/client";
import { NavLink } from "react-router-dom";

import PersonalLogo from "../pl-crop.png";

function Link({ href, label, offsite, children }) {
  var className = "max-lg:px-2 max-lg:py-1 hover:text-[#226F54]";
  if (offsite) {
    return (
      <a href={href} className={className} target="_blank">
        {label || children}
      </a>
    );
  }
  return (
    <NavLink className={className} to={href}>
      {({ isActive }) => (
        <span className={isActive ? "activeLink" : ""}>{label}</span>
      )}
    </NavLink>
  );
}

export default function Nav() {
  return (
    <nav className="flex max-w-xl text-[#B5B2C2] lg:pl-6 pt-2 lg:space-y-2 lg:flex-col max-lg:flex-wrap max-lg:flex-row lg:justify-start max-lg:justify-center max-lg:items-center">
      <NavLink to="/" className="lg:my-3 w-[60px] max-lg:mt-4 max-lg:mb-4">
          <img
            src={PersonalLogo}
            id="logo"
          />
      </NavLink>

      <Link label="Home" href="/" />
      <Link label="Portfolio" href="/portfolio" />
      {/* <Link label="Blog" href="/blog" />
      <Link label="About" href="/about" /> */}

      <span className="pt-6 max-lg:hidden font-extrabold text-xs">OFFSITE</span>
      <Link
        href="https://twitter.com/RemingtonArn"
        label="Twitter"
        offsite={true}
      />
      <Link label="GitHub" offsite={true} href="https://www.github.com/antiremy"/>
      <Link label="LinkedIn" offsite={true} href="https://www.linkedin.com/in/remington-arneson"/>
    </nav>
  );
}
