import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
    onVerificationSuccess: () => void;
}

const OTPVerificationModal = ({
    isOpen,
    onClose,
    phoneNumber,
    onVerificationSuccess
}: OTPVerificationModalProps) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendCountdown, setResendCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (isOpen) {
            setOtp(["", "", "", ""]);
            setResendCountdown(30);
            setCanResend(false);
            setIsVerifying(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const timer = setInterval(() => {
            setResendCountdown((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResendOTP = () => {
        if (!canResend) return;

        setResendCountdown(30);
        setCanResend(false);
        setOtp(["", "", "", ""]);

        toast({
            title: "OTP Resent",
            description: `Verification code sent to ${phoneNumber}`,
        });
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 4) {
            toast({
                title: "Invalid OTP",
                description: "Please enter the complete 4-digit OTP",
                variant: "destructive",
            });
            return;
        }

        setIsVerifying(true);

        // Simulate API call
        setTimeout(() => {
            setIsVerifying(false);
            toast({
                title: "Verification Successful",
                description: "Your phone number has been verified successfully!",
            });
            onVerificationSuccess();
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-orange-50 via-orange-100 to-blue-100">
                {/* Header */}
                <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <span className="text-xl">×</span>
                    </button>
                    <h1 className="text-lg font-semibold">Hoomora</h1>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <span className="text-xl">×</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center px-4 py-8">
                    {/* OTP Verification Card */}
                    <div className="w-full max-w-md bg-white shadow-lg border-0 rounded-lg">
                        <div className="p-8">
                            <div className="text-center space-y-6">
                                {/* Title */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        OTP Verification
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        A verification code has been sent to your number.
                                    </p>
                                </div>

                                {/* OTP Input Fields */}
                                <div className="flex justify-center space-x-3">
                                    {otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-16 h-16 text-center text-xl font-semibold border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg"
                                            maxLength={1}
                                            placeholder="-"
                                        />
                                    ))}
                                </div>

                                {/* Resend Section */}
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm">
                                        Didn't receive the OTP?{" "}
                                        {canResend ? (
                                            <button
                                                onClick={handleResendOTP}
                                                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                                            >
                                                Resend
                                            </button>
                                        ) : (
                                            <span className="text-orange-500 font-medium">
                                                Resend in {resendCountdown}s
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {/* Verify Button */}
                                <Button
                                    onClick={handleVerify}
                                    disabled={otp.join("").length !== 4 || isVerifying}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isVerifying ? "Verifying..." : "Verify"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Email */}
                    <div className="mt-8 flex items-center justify-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">help@hoomora.com</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OTPVerificationModal; 