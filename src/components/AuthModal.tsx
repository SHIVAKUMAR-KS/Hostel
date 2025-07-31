import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "register";
}

const AuthModal = ({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "register">(initialMode);
  const [authType, setAuthType] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    name: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google Sign In",
      description: "Google authentication would be integrated here",
    });
  };

  const handleEmailAuth = () => {
    if (mode === "register") {
      toast({
        title: "Account Created",
        description: "Welcome to Hoomora! Your account has been created successfully.",
      });
    } else {
      toast({
        title: "Signed In",
        description: "Welcome back to Hoomora!",
      });
    }
    onClose();
  };

  const handlePhoneAuth = () => {
    if (!otpSent) {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.phone}`,
      });
    } else {
      toast({
        title: "Phone Verified",
        description: "Welcome to Hoomora!",
      });
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      phone: "",
      password: "",
      name: "",
      otp: ""
    });
    setOtpSent(false);
    setShowPassword(false);
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "register" : "signin");
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Form */}
          <div className="p-8 space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Hoomora
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {mode === "signin" ? "Sign In!" : "Create Account!"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "signin" ? "Please enter your details" : "Join our community today"}
              </p>
            </div>

            <div className="space-y-4">
              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full h-12 text-base"
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>

              <div className="flex items-center space-x-2">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">or continue with</span>
                <Separator className="flex-1" />
              </div>

              {/* Auth Type Toggle */}
              <div className="flex space-x-2">
                <Button
                  variant={authType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAuthType("email")}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant={authType === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAuthType("phone")}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Phone
                </Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {mode === "register" && (
                  <div>
                    <Label htmlFor="name" className="text-base">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 text-base"
                    />
                  </div>
                )}

                {authType === "email" ? (
                  <>
                    <div>
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-base">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Enter your password"
                          className="h-12 text-base pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="phone" className="text-base">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 9876543210"
                        className="h-12 text-base"
                      />
                    </div>
                    {otpSent && (
                      <div>
                        <Label htmlFor="otp" className="text-base">OTP</Label>
                        <Input
                          id="otp"
                          value={formData.otp}
                          onChange={(e) => handleInputChange("otp", e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="h-12 text-base"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full h-12 text-base gradient-button"
                onClick={authType === "email" ? handleEmailAuth : handlePhoneAuth}
              >
                {authType === "email" 
                  ? (mode === "signin" ? "Sign In" : "Create Account")
                  : (otpSent ? "Verify OTP" : "Send OTP")
                }
              </Button>

              {/* Mode Switch */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
                </span>
                <Button variant="link" onClick={switchMode} className="p-0 ml-1 text-primary font-medium">
                  {mode === "signin" ? "Register" : "Sign In"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <img 
                src="src/assets/auth-illustration.jpg" 
                alt="Hostel Community Illustration"
                className="w-full h-auto max-w-lg rounded-lg shadow-lg mb-6"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                  Genuine & Verified Hostels
                </h3>
                <p className="text-orange-700 dark:text-orange-300 max-w-md">
                  Join a growing community of 500+ users, verified profiles, and active customers - creating connections that last
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                  <span>⭐ 4.8/5 rating</span>
                  <span>•</span>
                  <span>1000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;