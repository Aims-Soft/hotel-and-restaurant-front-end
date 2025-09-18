

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
import { RegisterUserService } from '../Services/register user/register-user.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.css',
})
export class ApplyFormComponent implements OnInit {
  isLoading: boolean = false;
  userData: any = {};

  experience: any[] = [];
  DegreeLevel: any[] = [];
  selectedExperience: number | null = null;
  selectedDegree: number | null = null;
  jobID!: number;

  constructor(
    private router: Router,
    private usersesssion: UserSessionService,
    private websiteservice: WebsiteService,
    private registeruserservice: RegisterUserService,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
    this.jobID = Number(params.get('id'));
    console.log("JobID from route:", this.jobID);
  });

    const userId = this.usersesssion.getUserID();
    this.getjobapply(userId);
    this.getDegreeLevel();
    this.getExperience();


  }

  getjobapply(userId: number): void {
    this.isLoading = true;
    this.websiteservice.getjobapply(userId).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response.length > 0) {
          this.userData = response[0];
        }
        console.log(this.userData, 'User Data');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching user info:', error);
      }
    );
  }

  getExperience(): void {
    this.isLoading = true;
    this.registeruserservice.getExperience().subscribe(
      (response) => {
        this.isLoading = false;
        this.experience = response;
        console.log('Experience:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Experience:', error);
      }
    );
  }
  onExperienceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedExperience = Number(select.value);
    console.log('Selected Exerperience ID:', this.selectedExperience);
  }

  getDegreeLevel(): void {
    this.isLoading = true;
    this.registeruserservice.getDegreeLevel().subscribe(
      (response) => {
        this.isLoading = false;
        this.DegreeLevel = response;
        console.log(response, 'types');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  onStudyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDegree = Number(select.value);
    console.log('Selected Industry ID:', this.selectedDegree);
  }



  onRegister(): void {
  const payload: any = {
    userID: this.usersesssion.getUserID(),                          
    jobID: this.jobID,           
    appliedAt: "", 
    description: "",
    lastStatus: "",               
    resume:  "",           
    jobApplicationStatusID: 2,           
    experienceID: this.selectedExperience,
    studyLevelID: this.selectedDegree,
    spType: "insert"
  };

  console.log("Final Payload:", payload);

  this.websiteservice.applyjob(payload).subscribe({
    next: (res) => {
      console.log("User apply job:", res);
      // alert hata kar message show karna ho to service ya toast use karein
    },
    error: (err) => {
      console.error("Error:", err);
    }
  });
}
}
