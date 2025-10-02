export type Priority = 'High' | 'Medium' | 'Low'
export type Status = 'Pending' | 'In Progress' | 'Resolved'

export interface Report {
  id: string
  title: string
  location: string
  priority: Priority
  status: Status
  description?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  department?: string
}

export interface ReportStats {
  totalReports: number
  resolvedToday: number
  inProgress: number
  activeUsers: number
  totalReportsGrowth: number
  resolvedTodayGrowth: number
  inProgressGrowth: number
  activeUsersGrowth: number
}
