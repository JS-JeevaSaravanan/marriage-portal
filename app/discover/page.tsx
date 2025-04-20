"use client";

import { useState } from "react";
import { profiles } from "@/lib/mock-data";
import ProfileList from "@/components/profile/ProfileList";
import SearchFilters from "@/components/search/SearchFilters";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Define types for filters
interface FilterCriteria {
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  location?: string;
  religion?: string;
  heightMin?: number;
  heightMax?: number;
  education?: string[];
  occupation?: string;
}

export default function DiscoverPage() {
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilters = (filters: FilterCriteria) => {
    // Filter profiles based on criteria
    const filtered = profiles.filter((profile) => {
      // Gender filter
      if (filters.gender && profile.gender !== filters.gender) {
        return false;
      }

      // Age range filter
      if (
        (filters.ageMin && profile.age < filters.ageMin) ||
        (filters.ageMax && profile.age > filters.ageMax)
      ) {
        return false;
      }

      // Location filter - case insensitive partial match
      if (
        filters.location &&
        !profile.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Religion filter
      if (
        filters.religion &&
        profile.religion?.toLowerCase() !== filters.religion.toLowerCase()
      ) {
        return false;
      }

      // Height range filter
      if (
        profile.height &&
        ((filters.heightMin && profile.height < filters.heightMin) ||
          (filters.heightMax && profile.height > filters.heightMax))
      ) {
        return false;
      }

      // Education filter - checks if any of the selected education options match
      if (
        filters.education &&
        filters.education.length > 0 &&
        !filters.education.some((edu: string) =>
          profile.education.toLowerCase().includes(edu.toLowerCase())
        )
      ) {
        return false;
      }

      // Occupation filter - case insensitive partial match
      if (
        filters.occupation &&
        !profile.occupation
          .toLowerCase()
          .includes(filters.occupation.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredProfiles(filtered);
  };

  // Toggle filters on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Profiles</h1>
          <p className="text-muted-foreground">
            Browse through potential matches and find your perfect partner
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <p className="text-sm text-muted-foreground">
              {filteredProfiles.length} profiles found
            </p>
          </div>

          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:col-span-1 mb-6 lg:mb-0`}
          >
            <SearchFilters onApplyFilters={handleApplyFilters} />
          </div>

          {/* Profiles Grid */}
          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProfiles.length} profiles found
              </p>
              <div className="flex items-center gap-2">
                {/* Additional sorting options could go here */}
              </div>
            </div>

            <ProfileList
              profiles={filteredProfiles}
              emptyMessage="No profiles match your search criteria. Try adjusting your filters."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
