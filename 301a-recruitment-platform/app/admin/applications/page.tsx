import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import ApplicationsClient from "./ApplicationsClient";

export default async function AdminApplicationsPage() {
  const isAuthenticated = await isAdminAuthenticated();
  
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return <ApplicationsClient />;
}
