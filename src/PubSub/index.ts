import { IPubSub, PubSubAction, PubSubListener } from './types';

export class PubSub<T> implements IPubSub<T> {
  private events: PubSubListener<T>[] = [];

  get listeners() {
    return this.events;
  }

  on(id: string, type: string, action: PubSubAction<T>): void {
    this.events.push({ id, type, action });
  }

  emit(type: string, value: T): void {
    this.events.forEach((event) => {
      event.type === type && event.action(value);
    })
  }

  off(id: string): void {
    this.events = this.events.filter((event) => event.id !== id);
  } 
}