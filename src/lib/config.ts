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
    meet: {
      baseUrl: "/meet",
      createMeet: "/create-meet",
      getMeetInfo: "/get-meet-info",
    },
  },
};
export default config;
