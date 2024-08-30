import {PagingRequest} from "@/api/ApiResonpse.ts";

export interface CreateChallengeGroupRequest {
  title: string;
  content: string;
  guide: string;
  category: Category;
  challenges: CreateChallengeDto[];
}

export interface ChallengeGroupPagingParams extends PagingRequest{
  category: Category;
}



export interface CreateChallengeDto {
  startDate: string;
  endDate: string;
  dayType: DayType;
  requiredCount: number;
  onceExp: number;
  successExp: number;
  difficulty: number;
}

export type Category = 'HEALTH' | 'ECHO' | 'SHARE' |'VOLUNTEER' |  'ETC';

type DayType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';