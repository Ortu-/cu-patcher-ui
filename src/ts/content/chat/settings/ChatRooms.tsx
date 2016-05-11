/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as events from '../../../core/events';
import BooleanOption from './BooleanOption';
import { Room } from '../../../chat/CSEChat';
import ChatClient from '../../../chat/ChatClient';

export interface ChatRoomsProps {
  getRooms: () => void;
}

export interface ChatRoomsState {
  roomList: Room[];
  roomsAutoJoin: string[];
}

class ChatRooms extends React.Component<ChatRoomsProps, ChatRoomsState> {

  client: ChatClient = new ChatClient();

  constructor(props: ChatRoomsProps) {
    super(props);
    this.state = this.initializeState();
    this.getRooms();
  }

  initializeState = (): ChatRoomsState => {
    let state: any = {};
    state.roomsAutoJoin = this.client.getStoredRooms();
    state.roomList = [];
    return state;
  }

  getRooms = (): void => {
    events.once('chat-room-list', this.gotRooms);
    this.props.getRooms();
  }

  gotRooms = (rooms: Room[]): void => {
    rooms.forEach((room: any) => {
      this.state.roomsAutoJoin.forEach((isAuto: string) => {
        const tRoom: string = room.jid.split('@')[0];
        room.displayName = tRoom;
        if (tRoom == isAuto) {
          room.autoJoin = true;
        }
      });
    });
    rooms = rooms.sort((a: any, b: any) => {
      return (a.displayName < b.displayName) ? -1 : (a.displayName > b.displayName) ? 1 : 0;
    });
    this.setState({ roomList: rooms } as any);
  }

  generateBooleanOption = (option: any) => {
    let state: any = this.state;
    return <BooleanOption key={option.displayName}
      optionKey={option.displayName}
      title={option.displayName.length <= 15 ? option.displayName : option.displayName.substring(0, 15) + '...'}
      description={option.name != option.displayName ? option.name : ''}
      isChecked={option.autoJoin}
      onChecked={this.updateItem}
      />;
  }

  updateItem = (room: string, setAuto: any) => {
    if (setAuto) {
      this.client.addToStoredRooms(room);
    }
    else {
      this.client.removeFromStoredRooms(room);
    }
  }

  render() {
    let roomList: JSX.Element[] = [];
    const rooms: any[] = this.state.roomList;
    if (rooms.length) {
      rooms.forEach((room: any, index: number) => {
        roomList.push(this.generateBooleanOption(room));
      });
    }

    return (
      <div>
        <h5>Autojoin Rooms:</h5>
        {roomList}
      </div>
    )
  }
}

export default ChatRooms;
