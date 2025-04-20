"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { profiles } from "@/lib/mock-data";
import { Profile } from "@/lib/types";
import {
  Heart,
  MessageCircle,
  Flag,
  Share2,
  MapPin,
  Briefcase,
  GraduationCap,
  Ruler,
  CalendarDays,
  Gift,
  Info,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Find profile by ID from mock data
    const foundProfile = profiles.find((p) => p.id === params.id);
    if (foundProfile) {
      setProfile(foundProfile);
    } else {
      // Profile not found, redirect to discover page
      router.push("/discover");
    }
  }, [params.id, router]);

  const nextPhoto = () => {
    if (profile && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  const previousPhoto = () => {
    if (profile && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? profile.photos.length - 1 : prev - 1
      );
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, you would send a request to your API
  };

  if (!profile) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Format height from cm to feet and inches
  const formatHeight = (heightInCm: number | undefined) => {
    if (!heightInCm) return "Not specified";
    
    const totalInches = heightInCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    
    return `${feet}'${inches}" (${heightInCm} cm)`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4">
        <div className="mb-6">
          <Link
            href="/discover"
            className="inline-flex items-center text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Discover
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photos */}
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden border shadow-sm">
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
                          onClick={previousPhoto}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                          aria-label="Previous photo"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                          aria-label="Next photo"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Photo indicators */}
                    {profile.photos.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                        {profile.photos.map((_, index) => (
                          <span
                            key={index}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              index === currentPhotoIndex
                                ? "bg-white"
                                : "bg-white/50"
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
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    Verified
                  </Badge>
                )}
              </div>

              <div className="p-4 flex gap-4">
                <Button
                  className={cn(
                    "flex-1",
                    isLiked
                      ? "bg-rose-500 hover:bg-rose-600"
                      : "bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 dark:bg-rose-900/20 dark:hover:bg-rose-900/30 dark:text-rose-300"
                  )}
                  onClick={toggleLike}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 mr-2",
                      isLiked ? "fill-white" : ""
                    )}
                  />
                  {isLiked ? "Interested" : "Show Interest"}
                </Button>
                <Link href={`/messages/${profile.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {profile.name}, {profile.age}
                  </h1>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                {/* Last active status could go here */}
              </div>
            </div>

            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Bio</h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p>{profile.occupation}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p>{profile.education}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p>{formatHeight(profile.height)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Religion</p>
                      <p>{profile.religion || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member since</p>
                      <p>{profile.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Looking for</p>
                      <p>Long term relationship</p>
                    </div>
                  </div>
                  {/* Add more profile details here */}
                </div>
              </TabsContent>

              <TabsContent value="interests" className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-4">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="p-6 bg-muted/30 rounded-xl border mt-6">
              <h3 className="font-medium text-lg mb-4">
                Matching Compatibility
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Overall</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Interests</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Values</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}