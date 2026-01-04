export type RecentSessions = {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
};

export type RecentSessionsProps = RecentSessions[];
