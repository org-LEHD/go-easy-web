import { useSession } from "next-auth/react";
import Login from "./login";

const Advertisers: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Advertisers</div>;
};
export default Advertisers;
