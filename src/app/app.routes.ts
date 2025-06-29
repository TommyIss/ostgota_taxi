import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { InfoComponent } from './pages/info/info.component';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { UseraccountComponent } from './pages/useraccount/useraccount.component';
import { NewbookingComponent } from './pages/newbooking/newbooking.component';
import { EditbookingComponent } from './pages/editbooking/editbooking.component';
import { EditroundtripComponent } from './pages/editroundtrip/editroundtrip.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'contact', component: ContactComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'about', component: AboutComponent},
    {path: 'info', component: InfoComponent},
    {path: 'accessibility', component: AccessibilityComponent},
    {path: 'useraccount', component: UseraccountComponent},
    {path: 'newbooking', component: NewbookingComponent},
    {path: 'editbooking/:id', component: EditbookingComponent}, 
    {path: 'editroundtrip/:id', component: EditroundtripComponent}
];
