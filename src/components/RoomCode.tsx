import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToCipboard() {
        navigator.clipboard.writeText(props.code);
        toast.success('Code copied.');
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToCipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}