"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'


import { useModal } from "@/hooks/use-modal-store";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';

export const InviteModal = ()=>{

    const {isOpen,onClose,type,data,onOpen} = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type==="invite";
    const {server} = data;

    const [copied,setCopied] = useState(false);
    const [loading,setLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () =>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        },1000)
    }
    const onNew = async()=>{
        try{
            setLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite",{ server:response.data} );
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-center text-2xl font-bold'>Invite Friends</DialogTitle>
                    
                </DialogHeader>
                <div className='p-6'>
                    <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                        Server Invite Link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input disabled={loading} className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 ' value={inviteUrl} />
                        <Button disabled={loading} onClick={onCopy} size="icon">
                        {
                            copied?
                                <Check />:
                                <Copy className='w-4 h-4' />
                        }
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={onNew} variant="link" size="sm" className='text-xs text-zinc-500 mt-4' >
                        Generate a new link
                        <RefreshCcw className='w-4 h-4 ml-2'/>
                    </Button>
                </div>
            </DialogContent>


        </Dialog>
    )
}