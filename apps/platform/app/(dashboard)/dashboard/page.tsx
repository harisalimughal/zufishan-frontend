import {
  ActivityFeed,
  GreetingHeader,
  MyCourses,
  StatsCards,
  TodaySchedule
} from "@/features/dashboard";


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <GreetingHeader />

      {/* Stats Cards Row */}
      <StatsCards />

      {/* Main Content: Courses + Right Sidebar */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* My Courses - Takes 2 columns */}
        <div className="xl:col-span-2">
          <MyCourses />
        </div>

        {/* Right Sidebar: Schedule + Activity */}
        <div className="space-y-6">
          <TodaySchedule />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
