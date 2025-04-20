"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    caste: "",
    motherTongue: "",
    country: "",
    state: "",
    city: "",
    maritalStatus: "",
    height: "",
    education: "",
    occupation: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Matrimonial Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField label="Full Name">
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Email">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Gender">
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Date of Birth">
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Religion">
            <Input
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Caste">
            <Input
              name="caste"
              value={formData.caste}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Mother Tongue">
            <Input
              name="motherTongue"
              value={formData.motherTongue}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Country">
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="State">
            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="City">
            <Input name="city" value={formData.city} onChange={handleChange} />
          </FormField>

          <FormField label="Marital Status">
            <Select
              value={formData.maritalStatus}
              onValueChange={(value) =>
                handleSelectChange("maritalStatus", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Height (in cm)">
            <Input
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Education">
            <Input
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Occupation">
            <Input
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="About" fullWidth>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </FormField>

          <div className="md:col-span-2 text-center">
            {/* <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2 hover:opacity-90 transition"
            >
              Register
            </button> */}

            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md bg-rose-500 hover:bg-rose-600 text-white px-8"
            >
             Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

const FormField = ({ label, children, fullWidth }: FormFieldProps) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-foreground mb-1">
      {label}
    </label>
    {children}
  </div>
);
