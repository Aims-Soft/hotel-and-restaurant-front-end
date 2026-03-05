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

  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  title= "hotel@gmail.com";

  ngOnInit(): void {
    
  }

  constructor(
    private usersessionservice: UserSessionService,
    private websiteservice:WebsiteService,
  
  ){

  }



  submitRequest(): void {

     this.successMessage = '';
    this.errorMessage = '';
    
      if (!this.formData.userName || !this.formData.email || !this.formData.userMessage || !this.formData.contact) {
    this.errorMessage = 'Please fill in all required fields.';
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.formData.email)) {
    this.errorMessage = 'Please enter a valid email address.';
    return;
  }

  // Validate message length
  if (this.formData.userMessage.length < 10) {
    this.errorMessage = 'Message must be at least 10 characters long.';
    return;
  }
    this.isSubmitting = true;
  
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
       this.isSubmitting = false;
        console.log('Saved Successfully', res);
        this.successMessage = 'Your request has been submitted successfully!';
        this.resetForm();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
    },
    (err: any) => { 
      this.isSubmitting = false;
        console.error('Error saving contact:', err);
        this.errorMessage = 'Something went wrong. Please try again!';
        
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
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
