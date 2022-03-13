import React from 'react';
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const BroadcastContext = React.createContext<any | undefined>(undefined);

export const  BroadcastProvider = (props:any ) => {
    const pusher = new Pusher('8ebbe329480dabcc9a2f', {
        cluster: 'us2'
    });
    const channel = pusher.subscribe('public');

    const value= React.useMemo(() => {
        return({
            channel,
        })
    },[pusher])

    return <BroadcastContext.Provider value={value} {...props}/>
}

export const useBroadcast = () => {
    const context = React.useContext(BroadcastContext);
    if (!context) {
        throw new Error('useBroadcast debe estar dentro del proveedor BroadcastContext')
    }
    return context;
}
