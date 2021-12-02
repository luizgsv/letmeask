import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from '../services/firebase';
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type firebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');
    const { user } = useAuth();


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {

            const databaseRoom = room.val();
            const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {};
            const pasedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom?.title);
            setQuestions(pasedQuestion);
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return {questions, title}
}