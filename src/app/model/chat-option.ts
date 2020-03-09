import { Window } from '../model/window';
import { IChatParticipant } from '../chat/chat-participant';

export interface IChatOption {
    isActive: boolean;
    displayLabel: string;
    action: (chattingTo: Window) => void;
    validateContext: (participant: IChatParticipant) => boolean;
}
