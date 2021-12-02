import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { FormEvent, useState } from 'react';
import logoImage from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';

import '../styles/auth.scss';
import toast from 'react-hot-toast';

export function NewRoom() {
    // const { user } = useAuth();

    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            toast.error('Error - invalid feature.');
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div>
            <div id="page-auth">
                <aside>
                    <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />
                    <strong>Crie salas de Q&amp;A ao vivo</strong>
                    <p>Tire as duvidas da sua audiencia em tempo real</p>
                </aside>
                <main>
                    <div className='main-content'>
                        <img src={logoImage} alt="Logo " />
                        <h2>Criar uma nova sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input
                                type="text"
                                placeholder="Nome da sala"
                                onChange={event => setNewRoom(event.target.value)}
                                value={newRoom}
                            />
                            <Button type="submit">
                                Criar sala
                            </Button>
                        </form>

                        <div>
                            <p className="back">Quer entrar em uma sala existente  <Link to="/">Clique aqui</Link> </p>

                        </div>

                    </div>
                </main>
            </div>
        </div>


    )
}