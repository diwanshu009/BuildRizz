import { v } from "convex/values";
import { mutation,query } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string()
    },
    handler: async(ctx,args)=>{
        const user = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()

        if(user?.length==0){
            const userId = await ctx.db.insert('users',{
                name: args.name,
                picture: args.picture,
                email: args.email,
                uid: args.uid
            })
            return {created: true, userId}
        }

        return {created: false, userId: user[0]._id}
    }
})

export const GetUser = query({
    args:{
        email: v.string()
    },
    handler: async(ctx,args)=>{
        const users = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()
        const user =  users[0]
        if(!user) return null
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture ?? null, 
            uid: user.uid ?? null,
        }
    }
})