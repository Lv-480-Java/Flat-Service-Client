import { ChatParticipantStatus } from '../model/chat-participant-status.enum';
import { IChatParticipant } from '../model/chat-participant';
import { ChatParticipantType } from './chat-participant-type.enum';

export class User implements IChatParticipant {
    public readonly participantType: ChatParticipantType = ChatParticipantType.User;
    public id: any;
    public displayName: string;
    public status: ChatParticipantStatus;
    public avatar: string;
}
