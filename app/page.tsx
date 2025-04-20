"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { profiles } from "@/lib/mock-data";
import ProfileList from "@/components/profile/ProfileList";
import { Heart, Users, Search, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Adding framer-motion for animations
// TODO: Install with: npm install framer-motion

export default function Home() {
  const [randomProfiles, setRandomProfiles] = useState(profiles);

  useEffect(() => {
    // Get a random subset of profiles
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    setRandomProfiles(shuffled.slice(0, 4));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-20 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-white dark:from-rose-900/10 dark:to-background" />
        <div className="container px-4 relative">
          <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Find Your Perfect{" "}
                <span className="text-rose-500">Life Partner</span>
              </motion.h1>
              <motion.p 
                className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of singles who have found their perfect match
                through our trusted matrimonial service. Start your journey to
                forever today.
              </motion.p>
              <motion.div 
                className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/register">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse Profiles
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <Image
                  src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=1280"
                  alt="Happy couple"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose HeartMatch?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We're dedicated to helping you find your perfect life partner with our
              advanced matching system and secure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-rose-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Our advanced algorithm connects you with compatible matches
                based on your preferences, values, and lifestyle.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="text-purple-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
              <p className="text-muted-foreground">
                Every profile undergoes rigorous verification to ensure you
                connect with genuine individuals looking for meaningful
                relationships.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Search className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-muted-foreground">
                Filter profiles by age, location, religion, education, and more
                to find exactly what you're looking for in a life partner.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-amber-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our priority. Control who sees your profile and
                communicate safely within our secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Profiles
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Discover some of our most compatible matches and start your
              journey to finding love.
            </p>
          </div>

          <ProfileList profiles={randomProfiles} />

          <div className="mt-12 text-center">
            <Link href="/discover">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                View More Profiles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="relative w-full aspect-square md:aspect-[4/3] max-w-md mx-auto">
                  <Image
                    src="https://images.pexels.com/photos/3585806/pexels-photo-3585806.jpeg?auto=compress&cs=tinysrgb&w=1280"
                    alt="Success couple story"
                    fill
                    className="object-cover rounded-2xl shadow-md"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Success Stories
                </h2>
                <div className="mt-6 bg-background rounded-xl p-6 shadow-sm border">
                  <p className="text-lg italic text-muted-foreground">
                    "We matched on HeartMatch in January and immediately felt a
                    connection. After a few months of getting to know each
                    other, we knew we had found our life partners. We're now
                    happily married and can't thank HeartMatch enough for
                    bringing us together!"
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="ml-4">
                      <p className="font-medium">Sarah & Michael</p>
                      <p className="text-sm text-muted-foreground">
                        Married April 2023
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/success-stories">
                    <Button variant="outline">Read More Success Stories</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of singles who have already found their life
              partner through HeartMatch.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/discover">
                <Button size="lg" variant="outline" className="px-8">
                  Browse Profiles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}