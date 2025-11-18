import { Component,OnInit} from '@angular/core';
import { WebsiteService } from '../Services/website/website.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';

declare var bootstrap: any;

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.css'
})
export class ContactMessagesComponent implements OnInit {
  messages: any[] = [];
  selectedMessage: any;
  searchTerm: string = '';
  private modalInstance: any;
  unreadCount: number = 0;

  constructor(
       private websiteservice:WebsiteService,
       private usersessionservice:UserSessionService,
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }


  loadMessages(): void {
    this.websiteservice.getmessages().subscribe({
        next: (res) => {
            console.log('load message:', res); 
            this.messages = res.map((msg: any) => ({
                ...msg,
                showMore: false,
                readMsg: msg.readMsg === true 
            }));
             this.unreadCount = this.messages.filter(msg => !msg.readMsg).length;
               this.websiteservice.updateCount(this.unreadCount);
        },
        error: (err) => {
            console.error('Error fetching messages:', err);
        }
    });
}

  openModal(msg: any): void {
    this.selectedMessage = msg;
    
   
    const modalElement = document.getElementById('messageModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
      
      
      if (!msg.readMsg) {
        this.saveReadStatus(msg);
      }
    }
  }

  onModalClose(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
   
    this.loadMessages();
  }

  saveReadStatus(msg: any): void {
    const userID = 1; 
    this.websiteservice.saveReadMsg(msg.contactUSID, userID).subscribe({
      next: (res) => {
        console.log('Read status updated:', res);
      
        const index = this.messages.findIndex(m => m.contactUSID === msg.contactUSID);
        if (index !== -1) {
          this.messages[index].readMsg = true;
          this.unreadCount--;
          this.websiteservice.updateCount(this.unreadCount);
        }
      },
      error: (err) => {
        console.error('Error updating read status:', err);
      }
    });
  }
}
