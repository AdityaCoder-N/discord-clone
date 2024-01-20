import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{ params:{ serverId:string } }){
    try {
        
        const profile = await currentProfile();
        const serverId = params.serverId;
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!serverId){
            return new NextResponse("Server ID Not Found",{status:400});
        }

        const server = await db.server.update({
            where:{
                id:serverId,
                profileId:{
                    not:profile.id
                },
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
                members:{
                    deleteMany:{
                        profileId:profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);


    } catch (error) {
        console.log("[SERVER_ID_LEAVE]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}