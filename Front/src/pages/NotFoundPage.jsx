import { Link } from "react-router";

export function NotFOundPage() {
  return (
    <main>
      <h3>Parece que te has perdido</h3>
      <Link to={'/'}>Regresa al inicio</Link>
    </main>
  )
}