/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgeGroup = "teen";

export interface UserStats {
  xp: number;
  streak: number;
  hearts: number;
  level: number;
  name: string;
  avatar: string;
  bossesDefeated: number;
  lastLessonDate: string | null;
  completedLessons: string[];
}

export type UserRole = "player" | "parent" | "student";

export interface InstitutionalConfig {
  studentName: string;
  institutionalEmail: string;
  verificationCode: string;
}

export interface ParentConfig {
  idNumber: string;
  verifiedEmail: string;
  childName: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  theme: string;
}

export interface Question {
  type: "multiple" | "connect" | "write" | "review";
  question: string;
  options?: string[];
  correct?: any;
  feedback?: string;
  hint?: string;
  reviewFromId?: string;
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  type: "anxiety" | "depression" | "general" | "boss" | "npc";
  activityType: "narrative" | "quiz" | "interactive";
  ageGroup: AgeGroup;
  completed: boolean;
  order: number;
  content: any[];
}

export interface CrisisContact {
  name: string;
  number: string;
  description: string;
}
