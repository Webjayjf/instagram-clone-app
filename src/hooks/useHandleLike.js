import { useState } from 'react';
import firebase from 'firebase/compat';

const useHandleLike = () => {
    const [loader, setLoader] = useState(false);

    const handlePostLike = (post, currentUser) => {
        setLoader(true);
        if (!loader) {
            const currentLikeStatus = !post.likes_by_users.includes(currentUser.email);
            try {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(post.owner_email)
                    .collection("posts")
                    .doc(post.id)
                    .update({
                        likes_by_users: currentLikeStatus
                        ? firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                        : firebase.firestore.FieldValue.arrayRemove(currentUser.email),
                    }
                );
            }
            catch (error) {
                console.error("Error updating document:", error);
            } finally {
                setLoader(false);
            };
        }

    };
  
    const handleStoryLike = (story, currentUser) => {
        setLoader(true);
        if (!loader) {
            try {
                if (story.likes_by_users.includes(currentUser.email)) {
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(story.owner_email)
                        .collection("stories")
                        .doc(story.id)
                        .update({
                        likes_by_users: firebase.firestore.FieldValue.arrayRemove(
                            currentUser.email
                        )}
                    );
                } else {
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(story.owner_email)
                        .collection("stories")
                        .doc(story.id)
                        .update({
                        likes_by_users: firebase.firestore.FieldValue.arrayUnion(
                            currentUser.email
                        )}
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    };

    return {
    handleStoryLike,
    handlePostLike
    }
}

export default useHandleLike;