import { useState } from 'react'
import firebase from 'firebase/compat';
import useChatAddUser from "../hooks/useChatAddUser";

const useSendTextMessage = ({user, currentUser}) => {
    const { chatAddUser } = useChatAddUser();
    const [loading, setLoading] = useState(false);
    const [textMessage, setTextMessage] = useState("");
  
    const sendTextMessage = async () => {
        if (!loading) {
        setLoading(true);
        try {
            if (user.status === undefined) {
                await chatAddUser(user);
            }
         
            const current = {
            email: currentUser.email,
            name: currentUser.name,
            profile_picture: currentUser.profile_picture,
            username: currentUser.username,
            status: "unseen",
            };
    
            const newCurrentMessage = {
            message: textMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            };
    
            const newUserMessage = {
            message: textMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "user",
            };
    
            const batch = firebase.firestore().batch();
    
            const currentChatRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .collection("chat")
            .doc(user.email);
    
            const newUserChatRef = firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("chat")
            .doc(currentUser.email);
    
            batch.set(newUserChatRef, current, { merge: true });
            batch.set(
            currentChatRef.collection("messages").doc(),
            newCurrentMessage
            );
            batch.set(newUserChatRef.collection("messages").doc(), newUserMessage);
    
            await batch.commit();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTextMessage("");
        }
        }
    };
  
    return { 
        sendTextMessage, 
        loading, 
        textMessage, 
        setTextMessage
    };
}

export default useSendTextMessage