import { environment } from '../../environments/environment';
export const UrlConfig = {
    Home: '',
    Department: 'departments',
    Subject: 'subjects',
    Advisor: 'advisors',
    Student: 'students',
    ProjectManages:'project-manages'
    // Packages: 'packages',
    // Payments: 'payments',
    // Reports: 'reports',
    // Emails: 'emails',
    // Users: 'users',
    // Addnewusers: 'addnewusers',
    // Chats: 'portals-chat',
    // Signin: 'signin',
    // Signinpin: 'signinpin'
};

export const baseUrl = environment.production ? 'http://test.9t.com' : 'http://localhost:38936';