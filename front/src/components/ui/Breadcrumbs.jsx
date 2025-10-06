import { Link, useLocation } from "react-router-dom";
import "../../styles/ui/breadcrumbs.css";

/**
 * Breadcrumbs component for contextual navigation
 * @param {Object} props
 * @param {Array} [props.items] - Custom breadcrumb items [{label, path}]
 * @param {string} [props.separator='/'] - Separator character
 */
export function Breadcrumbs({ items, separator = "/", className = "" }) {
  const location = useLocation();

  // Generate breadcrumbs from current path if no items provided
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);

  if (breadcrumbItems.length === 0) return null;

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="breadcrumbs">
      <ol className="breadcrumbs-list">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={item.path || index} className="breadcrumbs-item">
              {!isLast ? (
                <>
                  <Link to={item.path} className="breadcrumbs-link">
                    {index === 0 && item.label === "Inicio" ? (
                      <span className="breadcrumbs-home" aria-label="Inicio">
                        🏠
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    {separator}
                  </span>
                </>
              ) : (
                <span className="breadcrumbs-link active" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumbs from pathname
 * Maps routes to user-friendly labels
 */
function generateBreadcrumbs(pathname) {
  // Route label mapping
  const routeLabels = {
    "/": "Inicio",
    "/login": "Iniciar Sesión",
    "/register": "Registro",
    "/appointments": "Mis Citas",
    // Friendly app routes
    "/mis-citas": "Mis Citas",
    "/mis-turnos": "Mis Citas",
    "/appointments/new": "Nueva Cita",
    "/appointments/create": "Crear Cita",
    "/dashboard": "Panel",
  };

  // Split path into segments
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "Inicio", path: "/" }];
  }

  const breadcrumbs = [{ label: "Inicio", path: "/" }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Check if it's a dynamic route (ID)
    const isId = /^\d+$/.test(segment);

    if (isId) {
      // Skip numeric IDs in breadcrumbs (detail pages)
      return;
    }

    const label = routeLabels[currentPath] || capitalize(segment);
    breadcrumbs.push({
      label,
      path: currentPath,
    });
  });

  return breadcrumbs;
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Breadcrumbs;
