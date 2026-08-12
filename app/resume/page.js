import ResumeData from "./resumeData";
import { getPortfolioData } from "../actions";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const Resume = async () => {
  const data = await getPortfolioData();
  return <ResumeData data={data} />;
};

export default Resume;
