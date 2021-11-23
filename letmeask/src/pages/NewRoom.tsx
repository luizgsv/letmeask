import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import { Link} from 'react-router-dom';
import { Button } from '../components/Button';

import '../styles/auth.scss';
export function NewRoom() {

    return (<div>
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
                    <form >
                        <input type="text" placeholder="Nome da sala" />
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