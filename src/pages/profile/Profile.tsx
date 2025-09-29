    import { useEffect } from "react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { useAuth } from "@/hooks/userAuth";
    import { Spinner } from '@/components/ui/shadcn-io/spinner';

    export default function Profile() {
    const { profile, fetchProfile, logout } = useAuth();  

    useEffect(() => {
        if (!profile) fetchProfile();
    }, [profile, fetchProfile]);

    if (!profile) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="text-yellow-300 "size={128} />
            </div>
        );
    }

    return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <header className="flex w-full items-center justify-end bg-white p-4 shadow-sm">
        <Button 
          onClick={logout} 
          className="bg-blue-950 text-primary-foreground hover:bg-primary/90 px-18 py-6"
        >
          Logout
        </Button>
      </header>

      <main className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-sm p-8 shadow-lg">
          <CardContent className="flex flex-col items-center p-0">
            <span className="text-xs text-gray-800">Profile picture</span>
            <Avatar className="mt-4 h-24 w-32 avatar-rectangular">
              <AvatarImage 
                src={profile.avatar?.high || profile.avatar?.medium || profile.avatar?.low} 
                alt={profile.name}  
              />
              <AvatarFallback className="text-xl">
                {profile.name?.[0].toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="mt-8 w-full space-y-5 text-left">
              <div>
                <label className="text-xs text-gray-500">
                    Your <span className="font-bold text-gray-800">Name</span>
                </label>
                <div className="mt-2 rounded-lg bg-gray-100 p-2 px-3">
                    <span className="text-sm font-medium text-gray-600">{profile.name}</span>
                </div>
                </div>
                <div>
                <label className="text-xs text-gray-500">
                    Your <span className="font-bold text-gray-800">E-mail</span>
                </label>
                <div className="mt-2 rounded-lg bg-gray-100 p-2 px-3">
                    <span className="text-sm font-medium text-gray-600">{profile.email}</span>
                </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}