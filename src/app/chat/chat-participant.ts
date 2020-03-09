/*import { ChatParticipantStatus } from '../chat/chat-participant-status.enum';
import { ChatParticipantType } from './chat/chat-participant-type.enum';*/

import {ChatParticipantType} from '../model/chat-participant-type.enum';

export interface IChatParticipant {
    readonly participantType: ChatParticipantType;
    readonly id: 4;
   /* readonly status: ChatParticipantStatus;*/
    readonly avatar: string|null;
    readonly displayName: string;
}
