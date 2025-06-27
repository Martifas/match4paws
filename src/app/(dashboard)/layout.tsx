import NavigationBar from '@/components/navigationBar/NavigationBar';
import BottomBar from '@/components/ui/containers/BottomBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>

      <BottomBar alwaysSticky>
        <NavigationBar />
      </BottomBar>
    </div>
  );
}
