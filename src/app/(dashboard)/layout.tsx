// app/(dashboard)/layout.tsx                 ⬅️  nested layout
import NavigationBar from "@/components/navigationBar/NavigationBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>

      <NavigationBar />
    </div>
  );
}
