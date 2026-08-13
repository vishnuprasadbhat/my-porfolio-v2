import { getPortfolioData } from "../actions";
import EditData from "./editData";

const Dashboard = async () => {
  "use cache";
  const { id, data } = await getPortfolioData(true);
  return <EditData myData={data} id={id} />;
};

export default Dashboard;
