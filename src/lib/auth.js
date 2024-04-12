import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from "bcrypt"
import { authConfig } from "./auth.config"

const credentialsLogIn = async (credentials) => {
    try {
        connectToDb()
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found. Create an account to continue.")

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) throw new Error("Incorrect password.")

        return user;
    } catch (err) {
        throw new Error("Failed to log in");
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    return await credentialsLogIn(credentials);
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                connectToDb()
                try {
                    const exist = await User.findOne({ email: profile.email })

                    if (!exist) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            img: profile.avatar_url,
                        })

                        await newUser.save();
                    }

                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return true;
        },
        ...authConfig.callbacks
    },
})