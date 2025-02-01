import Sidebar from "@/components/ui/Sidebar";
import OfficeManagementPage from "./components/OfficeManagement"; // or any other content you want to display

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <OfficeManagementPage />
      </main>
    </div>
  );
}
