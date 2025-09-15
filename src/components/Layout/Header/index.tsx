import React from "react";
import { Menu, User } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import { Button } from "../../ui/Button";
import { NavLink } from "react-router-dom";
import { menuLinks } from "../menuLinks";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow p-5">
      <div className="flex gap-5 items-center">
        <Button
          className="p-2 rounded"
          onClick={onToggleSidebar}
          aria-label="Abrir/Fechar menu"
          variant="ghost"
        >
          <Menu className="h-6 w-6 text-gray-500" />
        </Button>
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Navegação principal */}
      <nav className="hidden md:flex">
        <ul className="flex gap-8">
          {menuLinks
            .filter((link) => link.showInHeader)
            .map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium hover:text-primary   ${
                      isActive ? "text-primary underline" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>

      {/* Saudação do usuário */}
      <div className="flex items-center gap-2">
        <p className="hidden md:block text-lg">
          Olá, <span className="font-bold">Usuário!</span>
        </p>
        {/* Ícone no mobile */}
        <User className="h-6 w-6 text-gray-500 md:hidden" />
      </div>
    </header>
  );
};

export default Header;
