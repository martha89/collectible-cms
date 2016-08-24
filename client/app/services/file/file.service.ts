import { Injectable }	                 from '@angular/core';
import { Observable }                    from 'rxjs/Observable';
import { User, CurrentUser }			 from '../../models/user';
import { File }                          from '../../models/file';
import { HttpService }	                 from '../http/http.service';
import { AuthenticateService }           from '../authenticate/authenticate.service';

@Injectable()
export class FileService {
    constructor(private httpService: HttpService, private authService: AuthenticateService) { }
    /**
     * Retrieve all files, or all files of a specified user.
     */
	readAll(id?: string): Observable<File[]> {
        let url: string = (id == null)  ? '/api/v1/file' : '/api/v1/user/' + id + '/file';
		return this.httpService.getSimple(url, this.authService.getToken())
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return json.data; 
            })
            .map( (jsonFiles) => {
                var files: File[] = [];
                for (var i = 0; i < jsonFiles.length; i++) {
                    files.push(new File(jsonFiles[i]));
                }
                return files;
            });
	}
    /**
     * Retrieve single file.
     */
    read(id: string) {
        return this.httpService.getSimple('/api/v1/file/' + id, this.authService.getToken())
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return new File(json.data);
            });
    }
    /**
     * Upload a file to a user's file repository.
     */
    create(user: User, data: FormData) {
        let url: string = '/api/v1/user/' + user._id + '/file';
        return this.httpService.postFile(url, data, this.authService.getToken())
            .map( (json) => {
                if (!json.status)
                    throw json.message;
                return new User(json.data);
            });
    }
    /**
     * Delete a single file.
     */
    delete(id: string) {
        return this.httpService.deleteSimple('/api/v1/file/' + id, this.authService.getToken())
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return true; 
            });
    }
}
