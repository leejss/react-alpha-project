import { useSelector } from "react-redux";
import Home from "../components/Home/Home";

const HomeContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <Home currentUser={currentUser} />;
};

export default HomeContainer;
