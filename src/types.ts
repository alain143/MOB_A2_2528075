export type Availability = "Available" | "Busy" | "Open to internship";

export type Profile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
};

export type Project = {
  id: string;
  title: string;
  problem: string;
  contribution: string;
  technology: string;
};

export type ProjectsStackParamList = {
  ProjectList: undefined;
  ProjectDetails: { projectId: string };
};
