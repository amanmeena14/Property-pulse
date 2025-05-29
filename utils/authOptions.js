import GoogleProvider from 'next-auth/providers/google';

export const auhtOptions ={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks:{
        //Invoked on sucessful signin
        async signIn({profile}){
            //1. connect to database
            //check if user exits
            //if not,then add user to database
            //return true to allow sign in
        },
        //modifies the session object
        async session({session}){
            //1. get user from database
            //2. assign the user id to the session
            //3. return session
        }
    }   
}