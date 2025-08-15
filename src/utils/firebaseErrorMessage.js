export const firebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address format.";

    case "auth/user-not-found":
      return "No user found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/missing-password":
      return "Password is required.";

    case "auth/popup-closed-by-user":
      return "Login popup was closed before completing sign in.";

    case "auth/popup-blocked":
      return "Popup blocked by the browser. Please allow popups.";

    case "auth/operation-not-allowed":
      return "This login method is not enabled. Contact support.";

    case "auth/network-request-failed":
      return "Network error! Check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again later.";

    case "auth/requires-recent-login":
      return "Please log in again to complete this action.";

    case "auth/credential-already-in-use":
      return "This credential is already linked with another account.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different login method.";

    case "auth/invalid-credential":
      return "Invalid credentials. Please try again.";

    case "auth/internal-error":
      return "Internal server error. Please try again later.";

    case "auth/user-disabled":
      return "This user account has been disabled.";

    default:
      return "Something went wrong. Please try again.";
  }
};
