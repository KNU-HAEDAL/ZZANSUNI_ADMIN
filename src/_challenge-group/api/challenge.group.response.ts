import {Category} from "@/_challenge-group/api/challenge.group.request.ts";

export interface ChallengeGroupModel {
  id: number;
  title: string;
  content: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  category: Category;
}