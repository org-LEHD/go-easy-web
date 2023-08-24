import { useSession } from "next-auth/react";
import Login from "./login";

const Attractions: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Attractions</div>;
};
export default Attractions;
