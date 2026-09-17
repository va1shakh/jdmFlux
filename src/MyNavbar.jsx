import { Navbar, NavBody, NavbarLogo, NavItems, NavbarButton } from "./components/Navbar";
import logo from './assets/logo.png'

function MyNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Cars",
      link: "/cars",
    },
    {
      name: "Mods",
      link: "/mods",
    },
    {
      name: "Builds",
      link: "/builds",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo title="JDMflux" logo={logo} />

        <NavItems items={navItems} />

        <NavbarButton href="/login">Login</NavbarButton>
      </NavBody>
    </Navbar>
  );
}

export default MyNavbar;
