import { Profile } from "@/lib/types";
import ProfileCard from "@/components/profile/ProfileCard";

interface ProfileListProps {
  profiles: Profile[];
  emptyMessage?: string;
}

export default function ProfileList({ 
  profiles, 
  emptyMessage = "No profiles found" 
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}