import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface serverSidebarProps{
  serverId:string
}

const ServerSidebar = async ({serverId}:serverSidebarProps) => {

  const profile = await currentProfile();
  if(!profile){
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where:{
      id:serverId,
      // members:{
      //   some:{
      //     profileId:profile.id
      //   }
      // }
    },
    include:{
      channels:{
        orderBy:{
          createdAt:"asc"
        }
      },
      members:{
        include:{
          profile:true
        },
        orderBy:{
          role:"asc"
        }
      }
    }
  })
  if(!server){
    return redirect("/");
  }

  const textChannels = server?.channels.filter((channel)=>channel.type===ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel)=>channel.type===ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel)=>channel.type===ChannelType.VIDEO)

  const members = server?.members.filter((member)=>member.profileId!==profile.id)

  const role = server?.members.find((member)=>member.profileId===profile.id)?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar