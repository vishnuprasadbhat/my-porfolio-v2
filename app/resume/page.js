import ResumeData from "./resumeData";
import { getPortfolioData } from "../actions";

const Resume = async () => {
  const data = await getPortfolioData();
  return <ResumeData data={data} />;
};

export default Resume;
