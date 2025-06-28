import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactData } from '../modules/contact-data';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  url: string = 'https://ostgotataxi-webservice.onrender.com/contact';
  constructor(private http: HttpClient) { }

  sendForm(contactData: ContactData) {
    return this.http.post(this.url, contactData);
  }
}
