"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, MessageCircle, Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/app/constants/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For demo purposes only
  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("matrimony-token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    // For demo purposes
    localStorage.setItem("matrimony-token", "demo-token");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("matrimony-token");
    setIsLoggedIn(false);
  };

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-background/95"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="font-bold text-xl text-primary">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/discover"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/search"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Search
            </Link>
            <Link
              href="/success-stories"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Success Stories
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/messages">
                  <Button variant="ghost" size="icon" aria-label="Messages">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button variant="ghost" size="icon" aria-label="Matches">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800"
                          alt="Profile"
                        />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="hover:text-primary"
                >
                  Sign In
                </Button>
                <Link href="/register">
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/discover"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link
                href="/search"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/success-stories"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Success Stories
              </Link>
            </nav>

            <div className="pt-4 border-t space-y-4">
              {isLoggedIn ? (
                <>
                  <div className="flex space-x-4">
                    <Link
                      href="/messages"
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Messages
                    </Link>
                    <Link
                      href="/matches"
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Matches
                    </Link>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start p-0 hover:text-rose-500"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Link
                    href="/register"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}