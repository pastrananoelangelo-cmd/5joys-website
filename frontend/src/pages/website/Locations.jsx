import { useMemo } from "react";
import { getLocations } from "../../services/website/locationService";

import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";

import LocationCard from "../../components/website/LocationCard";

function LocationsPage() {
  const locations = useMemo(() => getLocations(), []);

  return (
    <Section tone="surface">
      <SectionHeading
        tag="Our Locations"
        title="Find your nearest 5Joys"
        intro="Every 5Joys store follows the same standard for stock, cleanliness, and service, wherever you find us."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </Section>
  );
}

export default LocationsPage;