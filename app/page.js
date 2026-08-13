import Cursor from "@/components/Cursor";
//local data
// import data from "@/data/portfolio.json";
import Home from "@/components/Home";
import { getPortfolioData } from "./actions";

export default async function Portfolio() {
  const data = await getPortfolioData();
  return (
    <div className={`relative ${data.showCursor && "cursor-none"} px-2`}>
      {data.showCursor && (
        <div className="hidden tablet:flex">
          <Cursor />
        </div>
      )}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <Home data={data} />
    </div>
  );
}
