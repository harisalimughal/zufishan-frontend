import { Notifications } from "../Notifications";
import { SearchBar } from "../SearchBar";
import { UserProfileCard } from "../UserProfileCard";

export function Topbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
      </div>

      <div className="flex items-center gap-3">
        <SearchBar />
        <Notifications />
        <UserProfileCard />
      </div>
    </div>
  );
}
