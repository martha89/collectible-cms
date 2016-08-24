import { Injectable }									from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';
import { Observable }                                   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string, options?: RequestOptionsArgs) {
    	return this.http.get(url, options);
    }
    /**
     * Issue post request and return raw http response in observable.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
     *     var headers = new Headers();
  	 *     headers.append('Content-Type', 'application/json');
	 *	   return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), { headers: headers })
     *         .map( (res) => { return res.json(); })
	 *         .map( (res) => { return res.token; })
	 *         .subscribe(
	 *		       token => console.log("token " + token),
	 *	           err => console.log("error " + err),
	 *	           () => console.log('Authentication Complete')
	 *	       );
	 */
    post(url: string, body: any, options?: RequestOptionsArgs) {
    	return this.http.post(url, body, options)
    }
    patch(url: string, body: any, options?: RequestOptionsArgs) {
        return this.http.patch(url, body, options)
    }
    delete(url: string, options?: RequestOptionsArgs) {
        return this.http.delete(url, options);
    }
    /**
     * Serialize body and issue post request with 'applicaton/json', 
     * and x-access-token header. Return deserialized json response
     * in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param object body
     *    An object to JSON.stringify and submit as body content.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
	 *	   return this.httpService.postSimple('/api/v1/authenticate', authenticate)
	 *         .map( (json) => { return json.token; })
	 *         .subscribe(
	 *		       token => console.log("token " + token),
	 *	           err => console.log("error " + err),
	 *	           () => console.log('Authentication Complete')
	 *	       );
	 */
    postSimple(url: string, body: any, token?: string) : Observable<any> {
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
        if (token) {
            headers.append('x-access-token', token);
        }
    	return this.post(url, JSON.stringify(body), { headers: headers })
    		.map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Issue post request with 'multipart/form-data', and x-access-token header and
     * return deserialized json response in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param object body
     *    An object to JSON.stringify and submit as body content.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     */
    postFile(url: string, body: FormData, token?: string) : Observable<any> {
        // let observable: Observable<any> = Observable.create(observable => {
        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState == 4) {
        //             if (xhr.status == 200) {
        //                 observable.onNext(JSON.parse(xhr.response));
        //                 observable.onComplete();
        //             } else {
        //                 throw xhr.response;
        //             }
        //         }
        //     }
        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');            
        //     xhr.setRequestHeader("x-access-token", token);
        //     xhr.send(body);
        //     return () => { };
        // });
        // return observable;
        var headers = new Headers();
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.post(url, body, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Serialize body and issue patch request with 'applicaton/json', 
     * and x-access-token header. Return deserialized json response
     * in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param object body
     *    An object to JSON.stringify and submit as body content.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     */
    patchSimple(url: string, body: any, token?: string) : Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.patch(url, JSON.stringify(body), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Issue get request with x-access-token header and return deserialized
     * json response in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     */
    getSimple(url: string, token?: string) : Observable<any> {
        var headers = new Headers();
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.get(url, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Issue delete request with x-access-token header and return deserialized
     * json response in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     */
    deleteSimple(url: string, token?: string) : Observable<any> {
        var headers = new Headers();
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.delete(url, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Return the most human friendly message that may be obtained.
     */
    handleError(error: any) : Observable<any> {
        if (typeof(error['_body']) != 'undefined') {
            var json = JSON.parse(error._body);
            var message = json.message;
            if (message == 'SyntaxError: Unexpected token o in JSON at position 1') {
                message = 'Network failure. Did the server go away?';
            }
            return Observable.throw(message);
        }
        return Observable.throw(error);
    }
}
