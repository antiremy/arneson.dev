import ExternalLinks from "./ExternalLinks";

export default function Footer() {
  return (
    <footer className="bottom-0 mt-4 flex flex-col items-center space-y-1 p-4 text-xs">
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
