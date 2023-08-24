import { useSession } from "next-auth/react";
import Login from "./login";

const Locations: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Locations</div>;
};
export default Locations;
