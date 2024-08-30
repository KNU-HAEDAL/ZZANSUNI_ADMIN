import {Category} from "@/api/challenge-group/challenge.group.request.ts";

export interface ChallengeGroupModel {
  id: number;
  title: string;
  content: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  category: Category;
}