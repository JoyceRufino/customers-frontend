import { NavLink } from "react-router-dom";
import { menuLinks } from "../menuLinks";

const FooterMobile = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner md:hidden">
      <nav>
        <ul className="flex justify-around p-2 text-gray-700">
          {menuLinks
            .filter((link) => !link.showInHeader || link.showInFooter)
            .map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex flex-col items-center text-xs ${
                      isActive ? "text-primary" : "text-gray-500"
                    }`
                  }
                >
                  {Icon && <Icon size={24} />}
                  {label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterMobile;
