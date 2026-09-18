import {
  BookOpen,
  CalendarDays,
  UsersRound,
} from "lucide-react";

export const suggestedQuestions = [
  {
    question: "When is the next Wadhwani session?",
    answer:
      "Wadhwani Ignite sessions run twice weekly: Tuesdays for class sessions and Thursdays for Q&A/coaching at 15:00 CAT / 14:00 WAT / 16:00 EAT.",
    icon: CalendarDays,
    tone: "blue",
  },
  {
    question: "How many people are in the programme?",
    answer:
      "Cohort 1 includes 250 solutions. The official info pack does not state the total number of individual participants.",
    icon: UsersRound,
    tone: "green",
  },
  {
    question: "Tell me about the MIT AI course",
    answer:
      "The MIT Universal AI course is self-paced, runs from 14 September to 18 October 2026, and includes 16 compulsory foundational modules.",
    icon: BookOpen,
    tone: "violet",
  },
] as const;
