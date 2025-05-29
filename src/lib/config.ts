const config = {
  apiEndPoints: {
    auth: {
      baseUrl: "/auth",
      login: "/login",
      register: "/register",
      verifyOtp: "/verify-otp",
      resendOtp: "/resend-otp",
      getUser: "/user",
    },
    users: {
      baseUrl: "/users",
      getCurrentUser: "/me",
      search: "/search",
    },
    meet: {
      baseUrl: "/meet",
      createMeet: "/create-meet",
      getMeetInfo: "/get-meet-info",
    },
  },
};
export default config;
