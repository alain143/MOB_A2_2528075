import { Profile, Project } from "../types";

export const STUDENT = {
  fullName: "IGIRANEZA Alain Providence",
  regNumber: "25/28075",
  appName: "AlainPortfolio",
  verificationCode: "MOB-A2-8075",
  version: "1.0.0",
};

export const NAME_SENTENCE = `My name is ${STUDENT.fullName}.`;

export const DEFAULT_PROFILE: Profile = {
  headline: "Software Engineering student building tech for social good",
  bio:
    "I'm a Year 3 Software Engineering student at INES Ruhengeri. My goal is to gain " +
    "web and app development skills that help me solve social issues.",
  primarySkill: "Web and app development",
  availability: "Open to internship",
  imageUri: null,
};

export const SKILLS: string[] = [
  "Critical thinking",
  "Problem solving",
  "Programming",
  "Web and app development",
  "Communication",
];

export const EDUCATION: { period: string; title: string; place: string }[] = [
  {
    period: "2024 - Current",
    title: "Student in Software Engineering",
    place: "INES Ruhengeri",
  },
  {
    period: "2020 - 2023",
    title: "Advanced Level (PCM)",
    place: "G.S.O. Butare",
  },
  {
    period: "2017 - 2019",
    title: "Ordinary Level",
    place: "G.S.O. Butare",
  },
];

// TODO: Replace project 2 with one of your own real projects before submitting.
export const PROJECTS: Project[] = [
  {
    id: "alainportfolio",
    title: "AlainPortfolio Mobile App",
    problem:
      "Recruiters need a quick, offline way to understand a student's profile instead of reading a paper CV.",
    contribution:
      "I designed, built, tested and packaged the whole app myself: screens, navigation, profile editor, image handling and local storage.",
    technology: "React Native, Expo, TypeScript, React Navigation, AsyncStorage, EAS Build",
  },
  {
    id: "alainportfolio",
    title: "AlainPortfolio Mobile App",
    problem:
      "Recruiters need a quick, offline way to understand a student's profile instead of reading a paper CV.",
    contribution:
      "C, tested and packaged the whole app myself: screens, navigation, profile editor, image handling and local storage.",
    technology: "React Native, Expo, TypeScript, React Navigation, AsyncStorage, EAS Build",
  },
  {
    id: "milk-check",
    title: "Milk Check",
    problem:
      "Milk quality needs to be checked while milk is being supplied, so poor quality milk can be identified early and quality can be tracked.",
    contribution:
      " I designed screens and navigations.",
    technology: "React Native, Expo, TypeScript, React Navigation, AsyncStorage, EAS Build",
  },
];
