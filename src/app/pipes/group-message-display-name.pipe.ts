import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../model/group';
import { ChatParticipantType } from '../model/chat-participant-type.enum';
import { IChatParticipant } from '../model/chat-participant';
import { Message } from '../chat/message';

/*
 * Renders the display name of a participant in a group based on who's sent the message
*/
@Pipe({name: 'groupMessageDisplayName'})
export class GroupMessageDisplayNamePipe implements PipeTransform {
    transform(participant: IChatParticipant, message: Message): string {
      // tslint:disable-next-line:triple-equals
        if (participant && participant.participantType == ChatParticipantType.Group) {
            const group = participant as Group;
          // tslint:disable-next-line:triple-equals
            const userIndex = group.chattingTo.findIndex(x => x.id == message.fromId);

            return group.chattingTo[userIndex >= 0 ? userIndex : 0].displayName;
        } else {
            return '';
        }
    }
}
