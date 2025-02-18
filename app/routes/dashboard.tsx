import DashboardComponent from "~/components/dashboard/dashboard-component";
import { APP_NAME } from "~/config";

export function loader() {
  return { APP_NAME };
}

export default function Dashboard() {
  return (
    <DashboardComponent />
  )
}
