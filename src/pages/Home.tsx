import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

import '../styles/button.scss';
import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import toast from 'react-hot-toast';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode === '') {
            toast.error('Error - invalid feature.');
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (! (await roomRef).exists()) {
           toast.error('Room does not exist.');
           return;
        }

        if (( await roomRef).val().endedAt) {
            toast('Room already closed.', {
                icon: '💢'
            });
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração." />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Logo Img" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Icon Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

