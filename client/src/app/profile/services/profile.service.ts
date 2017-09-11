import { Inject, Injectable } from '@angular/core';
import { User } from '../../auth/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { FileUploadService } from '../../services/fileUpload.service';
import { Observable } from 'rxjs/Observable';
import { handleError } from '../../helpers/errorHandler';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfileService {
  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  saveProfile(userId: string, user: User, avatar?: File) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    if (avatar) {
      let updatedUser;

      return this.http.put(`${this.config.baseUrl}/api/users/${userId}`, user, { headers })
        .switchMap(res => {
          updatedUser = res;
          return this.changeAvatar(avatar, userId);
        })
        .map(res => {
          updatedUser.avatarUrl = JSON.parse(res);
          return updatedUser;
        })
        .catch(err => Observable.throw(handleError(err)));
    } else {
      return this.http.put(`${this.config.baseUrl}/api/users/${userId}`, user, { headers })
        .catch(err => Observable.throw(handleError(err)));
    }
  }

  private changeAvatar(avatar: File, userId: string) {
    return this.fileUploadService.upload(`${this.config.baseUrl}/api/users/${userId}/avatar`, 'PUT', avatar);
  }
}
