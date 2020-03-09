import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgChatOptionsComponent } from '../../chat/components/ng-chat-options/ng-chat-options.component';
import { IChatOption } from '../../model/chat-option';
import { Window } from '../../model/window';
import { IChatParticipant } from '../../chat/chat-participant';

describe('NgChatOptionsComponent', () => {
  let component: NgChatOptionsComponent;
  let fixture: ComponentFixture<NgChatOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgChatOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgChatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should invoke option action when option is clicked', () => {
    let actionInvoked = false;
    let actionInvokedArgument: Window = null;
    const mockedWindow = new Window(null, false, false);

    component.chattingTo = mockedWindow;

    const option: IChatOption = {
        isActive: false,
        validateContext: (participant: IChatParticipant) => true,
        action: (participant: Window) => {
            actionInvoked = true;
            actionInvokedArgument = participant;
        },
        displayLabel: 'Test Option'
    }

    component.onOptionClicked(option);

    expect(actionInvoked).toBeTruthy();
    expect(actionInvokedArgument).not.toBeNull();
    expect(actionInvokedArgument).toBe(mockedWindow);
    expect(option.isActive).toBeTruthy();
  });

  it('Should not invoke option action when option action is null or undefined', () => {
    const actionInvoked = false;
    const actionInvokedArgument: Window = null;
    const mockedWindow = new Window(null, false, false);

    component.chattingTo = mockedWindow;

    const option: IChatOption = {
        isActive: false,
        action: null,
        validateContext: null,
        displayLabel: 'Test Option'
    }

    component.onOptionClicked(option);

    expect(actionInvoked).toBeFalsy();
    expect(actionInvokedArgument).toBeNull();
    expect(option.isActive).toBeFalsy();
  });
});
