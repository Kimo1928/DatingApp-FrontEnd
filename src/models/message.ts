export interface Message {
    filter(arg0: (m: any) => boolean): unknown
    id: string
    content: string
    dataRead?: string
    messageSent: string
    senderId: string
    senderDisplayName: string
    senderImageUrl: string
    recipientId: string
    recipientDisplayName: string
    recipientImageUrl: string 
    CurrentUserSender?: boolean
  }