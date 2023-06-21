interface IUser {
     id: number;
     email: string;
     password: string;
     role: string;
     username: string;
   };
   
   const userFactory = (id: number, email: string, password: string, role: string, username: string): IUser => ({
     id,
     email,
     password,
     role,
     username
   });
   
   const bodyFactory = (email?: string, password?: string) => ({
     email,
     password
   });
   
   export const userMock = userFactory(
     1,
     'user@user.com',
     '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
     'user',
     'user'
   );
   
   export const bodyWithoutEmail = bodyFactory(undefined, 'password');
   export const bodyWithoutPass = bodyFactory('emailvalido@gmail.com');
   export const bodyInvalidEmail = bodyFactory('emailinvalido', 'password');
   export const bodyInvalidPass = bodyFactory('emailvalido@gmail.com', 'a');
   export const validBody = bodyFactory('user@user.com', 'secret_user');
   export const validBodyWrongPass = bodyFactory('user@user.com', 'secret_usesddasdsaddsar');
   
   export const jwtTokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4Njg0OTA5MiwiZXhwIjoxNjg2OTM1NDkyfQ.YL0E1iajp8iQ_i2nZQB_JujcIC24Xqy2fwavDfqtBhE';
   