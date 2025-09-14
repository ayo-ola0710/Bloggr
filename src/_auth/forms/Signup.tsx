import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, AtSign, FileText } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

type FormValues = z.infer<typeof SignUpValidation>;
const Signup = () => {
  const { loading, CreateUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(values: FormValues) {
    try {
      await CreateUser(values);
      toast.success("Account created successfully.");
      navigate("/Home");
    } catch {
      toast.error("Failed to create account.");
    }
  }
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      fullname: "",
      username: "",
      bio: "",
      email: "",
      location: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    handleSignup(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card max-w-lg">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our blogging community</p>
          <p className="auth-description">
            Start sharing your stories with the world
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Enter your full name"
                        className="pl-10 auth-input"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Username
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Choose a unique username"
                        className="pl-10 auth-input"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                      <Textarea
                        placeholder="Tell us about yourself and your interests..."
                        className="pl-10 auth-input resize-none min-h-[80px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Enter your email address"
                        className="pl-10 auth-input"
                        type="email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Location
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your Location"
                        className="pl-10 auth-input"
                        type="text"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 auth-input"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="auth-button">
              {loading ? "Loading..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="auth-link">
                Sign in here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
