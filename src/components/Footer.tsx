import ExternalLinks from "./ExternalLinks"

export default function Footer() {
    return (<footer className="text-xs bottom-0 p-4 mt-4 flex flex-col items-center space-y-1">
        <div className="mb-2 hidden md:block">
            <ExternalLinks />
        </div>
        <div>Created using React, Next.js, and Tailwind CSS</div>
        <div>&copy; {new Date().getFullYear()} Remington Arneson. All rights reserved.</div>
    </footer>)
}