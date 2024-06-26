export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.img = user.img;
                token.isAdmin = user.isAdmin;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.img = token.img;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user;
            // console.log(user);

            const onAdminPage = request.nextUrl?.pathname.startsWith("/admin");
            const onBlogPage = request.nextUrl?.pathname.startsWith("/blogs");
            const onLoginRegister = request.nextUrl?.pathname.startsWith("/login") || request.nextUrl?.pathname.startsWith("/register");

            if (onAdminPage && !user.isAdmin) return false;
            if (onBlogPage && !user) return false;
            if (onLoginRegister && user) return Response.redirect(new URL("/", request.nextUrl));
            return true;
        }
    }
}