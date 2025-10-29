import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStore, UserRole } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { setUserRole } = useDashboardStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleLogin = () => {
    setUserRole(selectedRole);
    toast.success(`Logged in as ${selectedRole}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">E-Commerce Analytics</CardTitle>
          <CardDescription>
            Select your role to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Role</Label>
            <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Admin</div>
                  <div className="text-sm text-muted-foreground">
                    Full access including hidden admin panel
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="analyst" id="analyst" />
                <Label htmlFor="analyst" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Analyst</div>
                  <div className="text-sm text-muted-foreground">
                    View analytics and reports
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="viewer" id="viewer" />
                <Label htmlFor="viewer" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Viewer</div>
                  <div className="text-sm text-muted-foreground">
                    Read-only access to dashboard
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleLogin} className="w-full" size="lg">
            Continue to Dashboard
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Hint: Select "Admin" to access the comprehensive admin panel</p>
            <p className="mt-1">Control all dashboard data and visibility settings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
