import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

console.log({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ], 
    callbacks: {
        async session({ session }) {
            console.log('in session');
            
            const sessionUser = await User.findOne({
                email: session.user?.email
            });
            session.user.id = sessionUser.id.toString();
            
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log('in signIn', user);
            try {
                await connectToDB();

                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile?.email
                });

                // if not, create a new user
                if (!userExists) {
                    console.log(profile);
                    
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.picture
                    });
                }

                return true;
            } catch (error: any) {
                console.log("Error checking if user exists: ", error?.message);
                console.log(error);
            }
        },
    }
})

export { handler as GET, handler as POST }