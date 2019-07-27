export interface NewsHeader {
  date: Date;
  timestamp: number;
  category: string;
  language: string;
  dailyNewsNo: number;
  isFlash: boolean;
  id: number;
  headline: string;
  source: string[];
}
