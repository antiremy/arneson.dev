import ExternalLinks from "./externalLinks";

export default function Footer() {
  return (
    <footer className="bottom-0 flex flex-col items-center space-y-1 p-4 text-xs lg:mt-4">
      <div className="mb-2 hidden lg:block">
        <ExternalLinks />
      </div>
      <div>Created using React, Next.js, and Tailwind CSS</div>
      <div>
        &copy; {new Date().getFullYear()} Remington Arneson. All rights
        reserved.
      </div>
    </footer>
  );
}
