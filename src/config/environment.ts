const environment = {
   apiUrl: process.env.NEXT_PUBLIC_API_URL,
   appName: process.env.NEXT_PUBLIC_APP_NAME!,
   appAuthorName: process.env.NEXT_PUBLIC_AUTHOR!,
   appContactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
   appPhoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '',
   primaryColor: process.env.PRIMARY_COLOR,
};

export default environment;
