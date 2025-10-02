import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost"
    ) {
      console.log("📊 En producción, aquí se enviaría a servicio de monitoreo");
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
            role="alert"
            aria-live="assertive"
          >
            <div
              style={{
                fontSize: "3rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
              aria-hidden="true"
            >
              ⚠️
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "1rem",
                color: "#dc3545",
              }}
            >
              Algo salió mal
            </h1>
            <p
              style={{
                textAlign: "center",
                color: "#6c757d",
                marginBottom: "2rem",
              }}
            >
              Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta
              recargar la página o volver al inicio.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  border: "1px solid #dee2e6",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#495057",
                  }}
                >
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre
                  style={{
                    fontSize: "0.875rem",
                    color: "#dc3545",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginTop: "0.5rem",
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      {"\n\n"}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={this.handleReload}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007bff")
                }
              >
                🔄 Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#545b62")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6c757d")
                }
              >
                🏠 Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
