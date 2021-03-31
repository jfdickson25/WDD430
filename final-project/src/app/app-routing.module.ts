import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddMemoryComponent } from './memories/add-memory/add-memory.component';
import { EditMemoryComponent } from './memories/edit-memory/edit-memory.component';
import { MemoriesComponent } from './memories/memories.component';
import { AddPersonComponent } from './people/add-person/add-person.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'people', component: PeopleComponent, children: [
    { path: 'add', component: AddPersonComponent},
    { path: 'edit/:id', component: EditPersonComponent }
  ]},
  { path: 'memories', children: [
      { path: ':id', component: MemoriesComponent, children: [
          { path: 'add', component: AddMemoryComponent },
          { path: 'edit/:memoryId', component: EditMemoryComponent}
        ] 
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
