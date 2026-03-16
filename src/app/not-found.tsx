import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="hr">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#faf9f7",
          }}
        >
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p
              style={{
                fontSize: "8rem",
                fontWeight: 700,
                color: "#d4d8ed",
                margin: 0,
                lineHeight: 1,
              }}
            >
              404
            </p>
            <h1
              style={{
                fontSize: "1.5rem",
                color: "#232c5f",
                marginTop: "-0.5rem",
              }}
            >
              Stranica nije pronađena
            </h1>
            <p style={{ color: "#8a8275", marginTop: "1rem" }}>
              Stranica koju tražite ne postoji.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginTop: "2rem",
                padding: "1rem 2rem",
                background: "#232c5f",
                color: "white",
                textDecoration: "none",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Početna
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
