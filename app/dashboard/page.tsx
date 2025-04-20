"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { profiles, interests, messages } from "@/lib/mock-data";
import ProfileCard from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Heart,
  Eye,
  Clock,
  Settings,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { Profile } from "@/lib/types";
import Image from "next/image"; // Import Image from next/image

export default function DashboardPage() {
  const [viewedProfiles, setViewedProfiles] = useState<Profile[]>([]);
  const [suggestedMatches, setSuggestedMatches] = useState<Profile[]>([]);
  const [receivedInterests, setReceivedInterests] = useState<Profile[]>([]);

  // For demo purposes, we'll simulate being logged in as profile with ID 1
  const loggedInProfileId = "1";

  useEffect(() => {
    // Get a few random profiles for suggested matches
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    const suggested = shuffled
      .filter((p) => p.id !== loggedInProfileId)
      .slice(0, 3);
    setSuggestedMatches(suggested);

    // Simulate some recently viewed profiles
    const viewed = shuffled
      .filter(
        (p) =>
          p.id !== loggedInProfileId && !suggested.find((s) => s.id === p.id)
      )
      .slice(0, 2);
    setViewedProfiles(viewed);

    // Get profiles that have shown interest in the logged user
    const receivedInterestIds = interests
      .filter((i) => i.receiverId === loggedInProfileId)
      .map((i) => i.senderId);
    const received = profiles.filter((p) => receivedInterestIds.includes(p.id));
    setReceivedInterests(received);
  }, [loggedInProfileId]);

  const getRecentMessages = () => {
    // Get messages for the logged-in user
    const userMessages = messages.filter(
      (m) =>
        m.senderId === loggedInProfileId || m.receiverId === loggedInProfileId
    );

    // Get unique conversation partners
    const conversationPartners = new Set();
    const uniqueConversations = userMessages.filter((message) => {
      const partnerId =
        message.senderId === loggedInProfileId
          ? message.receiverId
          : message.senderId;

      if (!conversationPartners.has(partnerId)) {
        conversationPartners.add(partnerId);
        return true;
      }

      return false;
    });

    return uniqueConversations.slice(0, 3);
  };

  const findProfileById = (id: string) => {
    return profiles.find((p) => p.id === id);
  };

  const recentMessages = getRecentMessages();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s your activity overview.
            </p>
          </div>
          <Link href="/settings">
            <Button variant="outline" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Heart className="h-7 w-7 text-rose-500 mb-2" />
                  <p className="text-2xl font-bold">
                    {receivedInterests.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Interests Received
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Eye className="h-7 w-7 text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">27</p>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <MessageCircle className="h-7 w-7 text-green-500 mb-2" />
                  <p className="text-2xl font-bold">{recentMessages.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Active Conversations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Clock className="h-7 w-7 text-amber-500 mb-2" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </CardContent>
              </Card>
            </div>

            {/* Suggested Matches */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Suggested Matches</CardTitle>
                <Link href="/discover">
                  <Button variant="link" className="text-rose-500 p-0 h-auto">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedMatches.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      className="border-0 shadow-none"
                    />
                  ))}
                </div>
                {suggestedMatches.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No suggestions yet. Check back soon!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="interests">
                  <TabsList className="mb-4">
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                    <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                  </TabsList>

                  <TabsContent value="interests">
                    {receivedInterests.length > 0 ? (
                      <div className="space-y-4">
                        {receivedInterests.map((profile) => (
                          <div
                            key={profile.id}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                <Image
                                  src={profile.photos[0]}
                                  alt={profile.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {profile.name}, {profile.age}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {profile.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/profile/${profile.id}`}>
                                <Button size="sm" variant="outline">
                                  View Profile
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                className="bg-rose-500 hover:bg-rose-600"
                              >
                                Accept
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No interests received yet.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="viewed">
                    {viewedProfiles.length > 0 ? (
                      <div className="space-y-4">
                        {viewedProfiles.map((profile) => (
                          <div
                            key={profile.id}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                <Image
                                  src={profile.photos[0]}
                                  alt={profile.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {profile.name}, {profile.age}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {profile.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/profile/${profile.id}`}>
                                <Button size="sm" variant="outline">
                                  View Again
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                className="bg-rose-500 hover:bg-rose-600"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No profiles viewed recently.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="messages">
                    {recentMessages.length > 0 ? (
                      <div className="space-y-4">
                        {recentMessages.map((message) => {
                          const isIncoming =
                            message.receiverId === loggedInProfileId;
                          const partnerId = isIncoming
                            ? message.senderId
                            : message.receiverId;
                          const partner = findProfileById(partnerId);

                          if (!partner) return null;

                          return (
                            <div
                              key={message.id}
                              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={partner.photos[0]}
                                    alt={partner.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover rounded-full"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {partner.name}, {partner.age}
                                  </p>
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    {message.content.substring(0, 40)}...
                                  </p>
                                </div>
                              </div>
                              <Link href={`/messages/${partnerId}`}>
                                <Button size="sm">
                                  Reply
                                  <ArrowUpRight className="h-3 w-3 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No messages yet.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Profile Picture</p>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        80%
                      </Badge>
                    </div>
                    <div className="w-full h-1 bg-muted/30 mt-2 rounded-md">
                      <div className="h-1 bg-rose-500 w-[80%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Profile Info</p>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        60%
                      </Badge>
                    </div>
                    <div className="w-full h-1 bg-muted/30 mt-2 rounded-md">
                      <div className="h-1 bg-rose-500 w-[60%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
