import Link from "next/link";

export default function NotFound() {
  return <main style={{ minHeight: "70vh", display: "grid", placeContent: "center", textAlign: "center", padding: 24, background: "#faf8f3", color: "#28251f" }}>
    <p style={{ fontSize: 10, letterSpacing: 3, color: "#6b7056" }}>AGNIESZKA · GNIEZNO</p>
    <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(42px,8vw,68px)", margin: "24px 0 12px" }}>Zgubiłaś <i style={{ color: "#6b7056" }}>drogę?</i></h1>
    <p style={{ lineHeight: 1.8, color: "#817a70" }}>Tej strony nie ma, ale zawsze możesz wrócić do nas.</p>
    <Link href="/" style={{ justifySelf: "center", marginTop: 26, background: "#28251f", color: "#fffdf7", padding: "15px 22px", fontSize: 11 }}>Wróć na stronę główną ↗</Link>
  </main>;
}
