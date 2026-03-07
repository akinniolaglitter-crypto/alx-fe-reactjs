import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>

      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}