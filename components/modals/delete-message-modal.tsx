"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import qs from "query-string"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';


export const DeleteMessageModal = ()=>{

    const {isOpen,onClose,type,data} = useModal();

    const isModalOpen = isOpen && type==="deleteMessage";
    const {apiUrl,query} = data;

    const [loading,setLoading] = useState(false);

    const onConfirm=async()=>{
        try {
            setLoading(true); 
            const url = qs.stringifyUrl({
                url:apiUrl || "",
                query
            })

            await axios.delete(url);
        
            onClose();
            
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-center text-2xl font-bold'>Delete Message</DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are you sure you want to do this? <br/>
                        The message will be permanently deleted
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button disabled={loading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={loading} variant="primary" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}