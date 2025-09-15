import React from "react";
import { NavLink } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import { menuLinks, type MenuLink } from "../menuLinks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuItem: React.FC<{ link: MenuLink; onClick: () => void }> = ({
  link,
  onClick,
}) => {
  const Icon = link.icon;
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `block p-2 rounded hover:bg-gray-200 flex items-center gap-2 ${
            isActive ? "text-primary" : ""
          }`
        }
        onClick={onClick}
      >
        {Icon && <Icon className="h-5 w-5" />}
        {link.label}
      </NavLink>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} />
      )}

      <aside
        className={`font-semibold fixed inset-y-0 left-0 z-30 w-64 shadow-lg transform 
        ${isOpen ? "translate-x-0 " : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        bg-white rounded-tr`}
      >
        <div className="relative flex items-center justify-center p-4 h-[100px] bg-[#ffffff0f] backdrop-blur-md border-b">
          <img src={logo} alt="Logo" className="h-15" />

          {isOpen && (
            <button
              onClick={onClose}
              className="absolute -bottom-4 -right-5 flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-white shadow-lg group"
              aria-label="Fechar menu"
            >
              <CircleArrowLeft className="h-4 w-4 text-white group-hover:text-black" />
            </button>
          )}
        </div>
        <div className="p-4 bg-white">
          <ul className="mt-2 space-y-2">
            {menuLinks.map((link) => (
              <MenuItem key={link.path} link={link} onClick={onClose} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
