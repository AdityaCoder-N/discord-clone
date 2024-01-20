"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { ManageMembersModal } from "../modals/manage-members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServerModal } from "../modals/leave-server";
import { DeleteServerModal } from "../modals/delete-server-modal";

export const ModalProvider = ()=>{

    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true);
    },[]);
    
    if(!isMounted)
        return null;

    return(
        <>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <ManageMembersModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
        </>
    )
}