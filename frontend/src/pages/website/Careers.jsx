import { useMemo } from "react";
import { getJobs } from "../../services/website/jobService";

import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";
import JobCard from "../../components/website/JobCard";

function CareersPage() {
  const jobs = useMemo(() => getJobs(), []);

  return (
    <Section tone="surface">
      <SectionHeading
        tag="Careers"
        title="Open positions"
        intro="We hire store crew, operations staff, and head office roles who care about running a great neighborhood store. Roles below are illustrative and will connect to live openings once the careers API is in place."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Section>
  );
}

export default CareersPage;