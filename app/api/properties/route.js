import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

export const GET = async (request)=>{
    try{
        await connectDB();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties),
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

export const POST= async (request)=>{
    try{
        await connectDB();

        const sessionUser= await getSessionUser();
        if(!sessionUser ||!sessionUser.userId){
            return new Response('User Id is required',{status:401});
        }
        const {userId}=  sessionUser;
        const formData=await request.formData();

        const amenities= formData.getAll('amenities');
        const images= formData.getAll('images').filter((image)=> image.name !=='');

        const propertyData={
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location:{
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds:formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates:{
                weekly: formData.get('rates.weekly'),
                monthly:formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info:{
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner:userId
        };

        const imageUploadPromises=[];

        for (const image of images) {
  try {
    console.log("Image object:", {
      name: image.name,
      type: image.type,
      size: image.size,
    });

    if (!image || !image.name || !image.type.startsWith("image/")) {
      console.error("Invalid or non-image file:", image.name);
      continue; // skip invalid files
    }

    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${image.type};base64,${imageBase64}`,
      { folder: "propertypulse" }
    );

    imageUploadPromises.push(result.secure_url);
  } catch (cloudErr) {
    console.error("❌ Cloudinary upload failed:", cloudErr);
    return new Response("Image upload failed", { status: 500 });
  }
}

        //wait for all images to upload
            const uploadedImages=await Promise.all(imageUploadPromises);
            //add uploaded images to propertyData object
            propertyData.images= uploadedImages;
        const newProperty=new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
        // return new Response(JSON.stringify({message:"success"}),
        // {status: 200});
    }
    catch(error){
        return new Response('Failed to add property',{status:500});
    }
}