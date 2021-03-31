import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './people/person/person.component';
import { MemoriesComponent } from './memories/memories.component';
import { MemoryComponent } from './memories/memory/memory.component';
import { AddPersonComponent } from './people/add-person/add-person.component';
import { HomeComponent } from './home/home.component';
import { AddMemoryComponent } from './memories/add-memory/add-memory.component';
import { EditMemoryComponent } from './memories/edit-memory/edit-memory.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    PersonComponent,
    MemoriesComponent,
    MemoryComponent,
    AddPersonComponent,
    HomeComponent,
    AddMemoryComponent,
    EditMemoryComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
