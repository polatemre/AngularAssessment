import { AssignComponent } from './../../user/components/assign/assign.component';
import { StudentComponent } from './../../user/components/student/student.component';
import { BookComponent } from './../../user/components/book/book.component';
import { TranslationService } from './../services/translation.service';
import { UserComponent } from './../components/admin/user/user.component';
import { GroupComponent } from './../components/admin/group/group.component';
import { LoginComponent } from './../components/admin/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from '../components/app/layouts/admin-layout/admin-layout.routing';
import { DashboardComponent } from '../components/app/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageComponent } from '../components/admin/language/language.component';
import { TranslateComponent } from '../components/admin/translate/translate.component';
import { OperationClaimComponent } from '../components/admin/operationclaim/operationClaim.component';
import { LogDtoComponent } from '../components/admin/log/logDto.component';
import { MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AssignDetailModalComponent } from 'app/user/components/assign/assign-modal/assign-detail-modal/assign-detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BookDetailModalComponent } from 'app/user/components/book/book-modal/book-detail-modal/book-detail-modal.component';
import { StudentDetailModalComponent } from 'app/user/components/student/student-modal/student-detail-modal/student-detail-modal.component';

// export function layoutHttpLoaderFactory(http: HttpClient) {
// 
//   return new TranslateHttpLoader(http,'../../../../../../assets/i18n/','.json');
// }

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        NgbModule,
        NgMultiSelectDropDownModule,
        SweetAlert2Module,
        MatDialogModule,
        MatProgressBarModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                //useFactory:layoutHttpLoaderFactory,
                useClass: TranslationService,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        DashboardComponent,
        UserComponent,
        LoginComponent,
        GroupComponent,
        LanguageComponent,
        TranslateComponent,
        OperationClaimComponent,
        LogDtoComponent,
        BookComponent,
        StudentComponent,
        AssignComponent,
        AssignDetailModalComponent,
        StudentDetailModalComponent,
        BookDetailModalComponent
    ]
})

export class AdminLayoutModule { }
