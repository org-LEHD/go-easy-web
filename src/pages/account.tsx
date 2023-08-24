import { useSession } from "next-auth/react";
import Login from "./login";

const Account: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return <div>Account</div>;
};
export default Account;
