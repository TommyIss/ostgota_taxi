import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactFormService } from '../../services/contact-form.service';
import { ContactData } from '../../modules/contact-data';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Properties
  error = {
    nameError: '',
    emailError: '',
    messageError: ''
  };
  formData: ContactData = {
    name: '',
    email: '',
    message: ''
  }
  
  consentGiven = false;

  constructor(private contactService: ContactFormService) {}

  // Metoder
  submitForm(){
    this.errorMessage();

    if(this.error.nameError || this.error.emailError || this.error.messageError) {
      return;
    }

    this.contactService.sendForm(this.formData).subscribe({
      next: () => {
        alert('Tack, ditt meddelande är skickats')
      
        // Rensa fälten
        this.formData = {
          name: '',
          email: '',
          message: ''
        }
      },
      error: () => alert('Tyvärr, något har gått fel.')
    });
  }

  errorMessage() {
    if(this.formData.name === '') {
      this.error.nameError = 'Du måste skicka ditt namn';
    } else {
      this.error.nameError = '';
    }

    if(this.formData.email === '') {
      this.error.emailError = 'Du måste skicka din e-post';
    } else {
      this.error.emailError = '';
    }

    if(this.formData.message === '') {
      this.error.messageError = 'Du måste skriva ett meddelande';
    } else {
      this.error.messageError = '';
    }
  }
}
