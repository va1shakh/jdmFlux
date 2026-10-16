import { Link } from "react-router";

const footerLinks = [
  {
    title: "EXPLORE",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Builds", to: "/builds" },
      { label: "Modifications", to: "/mods" },
    ],
  },
  {
    title: "ACCOUNT",
    links: [
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Main footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:gap-x-10 sm:py-12 md:grid-cols-4 lg:grid-cols-12">

          {/* Brand */}
          <div className="col-span-2 flex flex-col items-start gap-3 md:col-span-2 lg:col-span-6">
            <Link
              to="/"
              className="text-xl font-bold tracking-[0.2em] transition-opacity hover:opacity-70"
            >
              JDM<span className="text-white/45">FLUX</span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-white/45">
              Japanese blood. Racing soul.
              <br />
              Built for the JDM culture.
            </p>
          </div>

          {/* Navigation */}
          {footerLinks.map((group) => (
            <div
              key={group.title}
              className="flex flex-col items-start gap-4 md:col-span-1 lg:col-span-3"
            >
              <h3 className="text-xs font-semibold tracking-[0.18em] text-white/80">
                {group.title}
              </h3>

              <ul className="flex flex-col items-start gap-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/45 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-3 border-t border-white/10 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} JDMFLUX. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}