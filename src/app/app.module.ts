import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { EditComponent } from './student/edit/edit.component';
import { EditTeacherComponent } from './teacher/edit-teacher/edit-teacher.component';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './teacher/add-course/add-course.component';
import { StudentsComponent } from './course/students/students.component';
import { MainComponent } from './course/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    StudentComponent,
    TeacherComponent,
    HomeComponent,
    EditComponent,
    EditTeacherComponent,
    CourseComponent,
    AddCourseComponent,
    StudentsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, AuthGuard, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
