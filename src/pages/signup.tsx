import { SignupForm } from "@/components/signup-form"
import { useEffect } from "react"

export default function SignupPage() {
  // Check for dark mode preference on component mount
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode class if needed
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-gray-900 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  )
}
