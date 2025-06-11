import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async (request,{params})=>{
    try{
        await connectDB();
        const property = await Property.findById(params.id);
        if(!property) return new Response('property not found',{status: 400});
        return new Response(JSON.stringify(property),
    {
        status:200,
    });
    }
    catch(error){
        console.log(error);
        return new Response('Something went wrong',{
            status:500
        });
    }
}

export const DELETE = async (request,{params})=>{

    try{
        const propertyId=params.id;
        const sessionUser =await getSessionUser();

        if(!session || !session.userId){
            return new Response('User Id is required',{status:401});
        }

        const {userId}=sessionUser;
        await connectDB();
        const property = await Property.findById(propertyId);
        if(!property) return new Response('property not found',{status: 404});

        if(property.owner.toString()!==userId){
            return new Response('Unauthorized',{status:401});
        }

        await property.deleteone();
        return new Response('property deleted',
    {
        status:200,
    });
    }
    catch(error){
        console.log(error);
        return new Response('Something went wrong',{
            status:500
        });
    }
}