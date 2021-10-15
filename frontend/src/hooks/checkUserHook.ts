import { useEffect } from 'react';

import authStorage from '@/lib/storage/authStorage'

export default function checkUserHook() {
    useEffect(() => {
        const storedAuth = authStorage.get()
        console.log('checkUserHook useEffect: ', storedAuth)
    }, [])
}