"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: Profile;
  showActions?: boolean;
  className?: string;
}

export default function ProfileCard({ profile, showActions = true, className }: ProfileCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextPhoto = () => {
    if (profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  const previousPhoto = () => {
    if (profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev === 0 ? profile.photos.length - 1 : prev - 1));
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, you would send a request to your API
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {profile.photos.length > 0 ? (
          <>
            <Image 
              src={profile.photos[currentPhotoIndex]}
              alt={profile.name}
              fill
              className="object-cover transition-opacity"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {profile.photos.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.preventDefault(); previousPhoto(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                  aria-label="Previous photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); nextPhoto(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                  aria-label="Next photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Photo indicators */}
            {profile.photos.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {profile.photos.map((_, index) => (
                  <span 
                    key={index} 
                    className={cn(
                      "w-1.5 h-1.5 rounded-full", 
                      index === currentPhotoIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No photo</span>
          </div>
        )}

        {profile.isVerified && (
          <Badge className="absolute top-2 right-2 bg-green-500/80 hover:bg-green-500/80">
            Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/profile/${profile.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg line-clamp-1">
                {profile.name}, {profile.age}
              </h3>
            </Link>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="line-clamp-1">{profile.location}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Briefcase className="h-3 w-3 mr-2" />
              <span className="line-clamp-1">{profile.occupation}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <GraduationCap className="h-3 w-3 mr-2" />
              <span className="line-clamp-1">{profile.education}</span>
            </div>
          </div>

          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {profile.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {profile.interests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{profile.interests.length - 3}
                </Badge>
              )}
            </div>
          )}

          {showActions && (
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 mr-2"
                onClick={toggleLike}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 mr-1",
                    isLiked ? "fill-rose-500 text-rose-500" : ""
                  )}
                />
                {isLiked ? "Interested" : "Interest"}
              </Button>
              <Link href={`/messages/${profile.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}