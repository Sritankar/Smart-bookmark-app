import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/components/AuthPage";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;
