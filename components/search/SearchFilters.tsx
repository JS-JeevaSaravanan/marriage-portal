"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  onApplyFilters: (filters: any) => void;
  className?: string;
}

export default function SearchFilters({
  onApplyFilters,
  className,
}: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 45]);
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);
  const [gender, setGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [education, setEducation] = useState<string[]>([]);
  const [occupation, setOccupation] = useState<string>("");
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Education options
  const educationOptions = [
    { id: "high-school", label: "High School" },
    { id: "bachelors", label: "Bachelor's Degree" },
    { id: "masters", label: "Master's Degree" },
    { id: "phd", label: "PhD/Doctorate" },
  ];

  const handleEducationChange = (checked: boolean, value: string) => {
    setEducation((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleApplyFilters = () => {
    // Count active filters
    let count = 0;
    if (gender && gender !== "any") count++;
    if (location) count++;
    if (religion && religion !== "any") count++;
    if (education.length > 0) count++;
    if (occupation) count++;
    if (ageRange[0] !== 21 || ageRange[1] !== 45) count++;
    if (heightRange[0] !== 150 || heightRange[1] !== 190) count++;

    setActiveFiltersCount(count);

    // Create filters object
    const filters = {
      gender: gender === "any" ? "" : gender,
      location,
      religion: religion === "any" ? "" : religion,
      education,
      occupation,
      ageMin: ageRange[0],
      ageMax: ageRange[1],
      heightMin: heightRange[0],
      heightMax: heightRange[1],
    };

    onApplyFilters(filters);

    // On mobile, close the filters after applying
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleResetFilters = () => {
    setGender("");
    setLocation("");
    setReligion("");
    setEducation([]);
    setOccupation("");
    setAgeRange([21, 45]);
    setHeightRange([150, 190]);
    setActiveFiltersCount(0);

    onApplyFilters({});
  };

  return (
    <div className={cn("bg-card rounded-lg border", className)}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              className="ml-2 bg-primary text-primary-foreground"
              variant="default"
            >
              {activeFiltersCount}
            </Badge>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Content */}
      <div className={cn("md:block", isOpen ? "block" : "hidden")}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">Filters</h3>
            <div className="hidden md:block">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Age Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="age-range">Age</Label>
                <span className="text-sm text-muted-foreground">
                  {ageRange[0]} - {ageRange[1]}
                </span>
              </div>
              <Slider
                id="age-range"
                min={18}
                max={70}
                step={1}
                value={[ageRange[0], ageRange[1]]}
                onValueChange={(value) => setAgeRange([value[0], value[1]])}
                className="py-4"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Any gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any gender</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State or Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Religion */}
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Select value={religion} onValueChange={setReligion}>
                <SelectTrigger id="religion">
                  <SelectValue placeholder="Any religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any religion</SelectItem>
                  <SelectItem value="christian">Christian</SelectItem>
                  <SelectItem value="hindu">Hindu</SelectItem>
                  <SelectItem value="muslim">Muslim</SelectItem>
                  <SelectItem value="buddhist">Buddhist</SelectItem>
                  <SelectItem value="sikh">Sikh</SelectItem>
                  <SelectItem value="jewish">Jewish</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Height Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="height-range">Height (cm)</Label>
                <span className="text-sm text-muted-foreground">
                  {heightRange[0]} - {heightRange[1]} cm
                </span>
              </div>
              <Slider
                id="height-range"
                min={140}
                max={210}
                step={1}
                value={[heightRange[0], heightRange[1]]}
                onValueChange={(value) => setHeightRange([value[0], value[1]])}
                className="py-4"
              />
            </div>

            {/* Education */}
            <div className="space-y-3">
              <Label>Education</Label>
              <div className="space-y-2">
                {educationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`education-${option.id}`}
                      checked={education.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleEducationChange(!!checked, option.id)
                      }
                    />
                    <label
                      htmlFor={`education-${option.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="Any occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <Button
            className="w-full bg-rose-500 hover:bg-rose-600"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
