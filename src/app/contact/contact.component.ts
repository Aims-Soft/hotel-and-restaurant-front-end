import { Component,OnInit} from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent  implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(
    private usersessionservice: UserSessionService,
    private websiteservice:WebsiteService,
  
  ){

  }



  submitRequest(): void {
  // Construct payload manually here
  const payload = {
    userName: this.formData.userName,
    email: this.formData.email,
    contact: this.formData.contact,
    subject:this.formData.subject,
    userMessage: this.formData.userMessage,
    userID: this.usersessionservice.getUserID() || 0,
    spType: 'insert'
  };

  console.log('Payload sending:', payload);

  this.websiteservice.contactus(payload).subscribe(
    (res: any) => {
      console.log('Saved Successfully', res);
      alert('Your request has been submitted!');
      this.resetForm();
    },
    (err: any) => {
      console.error('Error saving contact:', err);
      alert('Something went wrong, try again!');
    }
  );
}

formData = {
  userName: '',
  email: '',
  contact: '',
  subject: '',
  userMessage: ''
};

resetForm(): void {
  this.formData = {
    userName: '',
    email: '',
    contact: '',
    subject: '',
    userMessage: ''
  };
}

}
