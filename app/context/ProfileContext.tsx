// ProfileContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for Profile data
type ProfileData = {
  user: string;
  phone: string;
  gender: string;
  dob: string;
  profileImage: string | null;
  email: string;
};

// Type for Scholarship data
type ScholarshipData = {
  school: string;
  field: string;
  gpa: string;
  achievements: string;
};

// Type for context
type AppData = {
  profile: ProfileData;
  scholarship: ScholarshipData;
  setProfile: (data: Partial<ProfileData>) => void;
  setScholarship: (data: Partial<ScholarshipData>) => void;
};

// Default values
const defaultProfile: ProfileData = {
  user: '',
  phone: '',
  gender: '',
  dob: '',
  profileImage: null,
  email: 'test123@gmail.com',
};

const defaultScholarship: ScholarshipData = {
  school: '',
  field: '',
  gpa: '',
  achievements: '',
};

// Create Context with default dummy functions
const ProfileContext = createContext<AppData>({
  profile: defaultProfile,
  scholarship: defaultScholarship,
  setProfile: () => {},
  setScholarship: () => {},
});

// Hook to use context easily
export const useProfile = () => useContext(ProfileContext);

// Provider component → wraps app/screens and provides the data
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<ProfileData>(defaultProfile);
  const [scholarship, setScholarshipState] = useState<ScholarshipData>(defaultScholarship);

  // Merge new profile data
  const setProfile = (data: Partial<ProfileData>) => {
    setProfileState((prev) => ({ ...prev, ...data }));
  };

  // Merge new scholarship data
  const setScholarship = (data: Partial<ScholarshipData>) => {
    setScholarshipState((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, scholarship, setProfile, setScholarship }}>
      {children}
    </ProfileContext.Provider>
  );
};