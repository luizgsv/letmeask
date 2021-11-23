import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';

import '../styles/button.scss';
import '../styles/auth.scss';
import {firebase, auth} from '../services/firebase';


export function Home() {

    const history = useHistory();

    function handleCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider() 
        auth.signInWithPopup(provider).then((result) => {
            console.log(result)
        })
        
        history.push('/rooms/new')
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração." />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main >
                <div className='main-content'>
                    <img src={logoImg} alt="Logo Img" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Icon Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form >
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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

