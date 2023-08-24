import { useSession } from "next-auth/react";
import Login from "./login";

const Advertisements: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Advertisements</div>;
};
export default Advertisements;
