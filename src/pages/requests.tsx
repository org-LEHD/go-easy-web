import { useSession } from "next-auth/react";
import Login from "./login";

const Requests: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Requests</div>;
};
export default Requests;
