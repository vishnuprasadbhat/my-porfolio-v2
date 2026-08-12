import { getPortfolioData } from "../actions";
import EditData from "./editData";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const Dashboard = async () => {
  const { id, data } = await getPortfolioData(true);
  return <EditData myData={data} id={id} />;
};

export default Dashboard;
