/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgeGroup = 'child' | 'preteen' | 'teen';

export interface UserStats {
  xp: number;
  streak: number;
  hearts: number; // Will use for infinite or display
  level: number;
  name: string;
  avatar: string;
  bossesDefeated: number;
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

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  type: 'anxiety' | 'depression' | 'general' | 'boss' | 'npc';
  activityType: 'narrative' | 'quiz' | 'interactive';
  ageGroup: AgeGroup;
  completed: boolean;
  order: number;
  content?: any[]; // Allow objects for quiz/interactive
}

export interface CrisisContact {
  name: string;
  number: string;
  description: string;
}
