import { HiUser } from 'react-icons/hi';
import { Button } from "../ui/button";

export default function DashboardComponent() {
  return (
    <div className="flex flex-row w-full overflow-x-auto">
      <div className="flex flex-col gap-5 basis-1/2 items-center p-3">
        <span className="text-2xl font-bold">Manage Data</span>
        <div className="flex flex-col gap-5 min-w-[300px]">
          <Button to="/users" className="w-full"><HiUser size={24} />Users</Button>
        </div>
      </div>
      <div className="flex flex-col gap-5 basis-1/2 p-3">
      </div>
    </div>
  )
}
