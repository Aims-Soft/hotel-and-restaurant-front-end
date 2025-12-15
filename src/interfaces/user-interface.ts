export interface UserProfileInterface {
  // Basic Information
  userID: string;        //0
  spType: string;        //1
  userName: string;      //2
  cnic: string;          //3
  profession: string;    //4
  
  // Education & Experience
  studyLevelID: string;  //5
  experienceID: string;  //6
  
  // Location
  countryID: string;     //7
  cityID: string;       //8
  address: string;      //9
  
  // Contact Information
  contactNo: string;    //10
  email: string;        //11
  genderID: string;     //12
  
  // Profile Image
  eDoc: string;         //13
  eDocExt: string;      //14
  eDocPath: string;     //15
  
  // Resume/PDF
  eResume: string;      //16
  eResumeExt: string;   //17
  eResumePath: string;  //18
  
  // Password (optional)
  password: string;     //19
  
  // Domains/Preferences (JSON string)
  json: string;         //20
}