import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
//import { ToastController } from 'ionic-angular';
import { GlobalsService } from './globals.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    cart: any = {
        items: [],
        final_cart_value: 0
    };


    constructor(private http: HttpClient, private globals: GlobalsService) {

    }

    getAWSIdentityToken(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/uploads/aws-s3-sign', {})
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    getUserAWSIdentityToken(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/uploads/aws-s3-sign', {})
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    templateListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/templates?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    createCompany(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/companies/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteCompany(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/companies/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateCompany(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/companies/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
    addImageCompany(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/companies/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    companyListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/companies?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/jobs/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/jobs/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    changeStatusJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/blogs/change-status', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/jobs/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/jobs/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/jobs/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    jobListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/jobs?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    applyJob(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/jobs/apply', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    appliedUserJobs(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'user/job-applications?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.q != typeof undefined) {
                Url += "&q=" + params.q;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.job != typeof undefined) {
                Url += "&job=" + params.job;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    appliedUserJobDetails(jobID): Promise<any> {

        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/job-application/' + jobID, {})
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }


    appliedJobs(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/job-applications?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.q != typeof undefined) {
                Url += "&q=" + params.q;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.owner != typeof undefined) {
                Url += "&owner=" + params.owner;
            }
            if (typeof params.job != typeof undefined) {
                Url += "&job=" + params.job;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }






    blogListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/blogs?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createBlog(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/blogs/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateBlog(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/blogs/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteBlog(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/blogs/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageBlog(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/blogs/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageBlog(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/blogs/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }




    videoListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/videos?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }
    createVideo(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/videos/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateVideo(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/videos/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteVideo(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/videos/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageVideo(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/videos/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageVideo(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/videos/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }




    bannerListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/banners?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.location != typeof undefined) {
                Url += "&location=" + params.location;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }
    createBanner(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/banners/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateBanner(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/banners/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteBanner(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/banners/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageBanner(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/banners/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageBanner(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/banners/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }












    createEvent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/events/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateEvent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/events/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteEvent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/events/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageEvent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/events/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageEvent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/events/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    eventListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/events?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }





    workshopListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/workshops?status=';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.atcrs != typeof undefined) {
                Url += "&atcrs=" + params.atcrs;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/workshops/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/workshops/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/workshops/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/workshops/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/workshops/delete-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }



    courseListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/courses?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.atcrs != typeof undefined) {
                Url += "&atcrs=" + params.atcrs;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createCourse(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/courses/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateCourse(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/courses/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteCourse(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/courses/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }





    contentListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/contents?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.atcrs != typeof undefined) {
                Url += "&atcrs=" + params.atcrs;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createContent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/contents/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateContent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/contents/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteContent(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/contents/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    interviewListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/interviews?status=';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.atcrs != typeof undefined) {
                Url += "&atcrs=" + params.atcrs;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/interviews/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/interviews/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/interviews/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    createInterviewQuestion(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/interviews/add-question', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updateInterviewQuestion(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/interviews/modify-question', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteInterviewQuestion(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/interviews/delete-question', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    addImageInterviewQuestion(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.patch(this.globals.get('appConfig').apiUrl + 'admin/interviews/add-question-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deleteImageInterviewQuestion(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/interviews/delete-question-image', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    interviewApplicationListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/interview-applications?status=';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.owner != typeof undefined) {
                Url += "&owner=" + params.owner;
            }
            if (typeof params.interview != typeof undefined) {
                Url += "&interview=" + params.interview;
            }

            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    pageListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/pages?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.atcrs != typeof undefined) {
                Url += "&atcrs=" + params.atcrs;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            this.globals.pages = data.response.list;
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    createPage(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/pages/register', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    updatePage(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/pages/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    deletePage(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/pages/delete', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }



    updateWidget(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.put(this.globals.get('appConfig').apiUrl + 'admin/homepage/modify', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
    listWidgets(company): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/homepage/' + company;
            this.http.get(Url)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // console.log(data);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    getCourseProgressAllUsers(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/enrollments/enrolled-workshops-with-progress?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.wrksid != typeof undefined) {
                Url += "&wrksid=" + params.wrksid;
            }
            if (typeof params.user != typeof undefined) {
                Url += "&user=" + params.user;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    getCourseProgress(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'user/enrollments/enrolled-workshops-with-progress?status=active';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.wrksid != typeof undefined) {
                Url += "&wrksid=" + params.wrksid;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }


    setWorkshopProgess(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/enrollments/content-set-progress', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }


    enrollWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/enrollments/enroll-workshop', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    completeWorkshop(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/enrollments/complete-workshop', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        console.log(err)
                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }


    getInterviewDetails(interviewVirtualId): Promise<any> {
        var Uri = this.globals.get('appConfig').apiUrl + 'api/interview/' + interviewVirtualId;
        let promise = new Promise((resolve, reject) => {
            this.http.get(Uri)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        // this.globals.showErrorAlert(this.getError(err));
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    getApplicationDetails(applicationId): Promise<any> {
        var Uri = this.globals.get('appConfig').apiUrl + 'user/interview-application/' + applicationId;
        let promise = new Promise((resolve, reject) => {
            this.http.get(Uri)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    initiateInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/initiate-interview', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Profile has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    startInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/begin-interview', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Profile has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }


    submitInterviewAnswer(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/submit-interview-answer', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Profile has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        // this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }




    finalizeInterview(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/finalize-interview', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Profile has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {

                        this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    getInterviewAnswer(data, userRole): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + userRole + '/get-interview-answers', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Password has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        // this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    mediaManagerListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/media-manager/list?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.name != typeof undefined) {
                Url += "&name=" + params.name;
            }
            if (typeof params.folder != typeof undefined) {
                Url += "&folder=" + params.folder;
            }
            if (typeof params.type != typeof undefined) {
                Url += "&type=" + params.type;
            }
            if (typeof params.company != typeof undefined) {
                Url += "&company=" + params.company;
            }

            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {

                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    mediaManagerGetDetails(folder): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'admin/media-manager/get-details/' + folder;

            this.http.get(Url)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    mediaManagerAddImage(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/media-manager/add-image', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Password has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        // this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);  
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    mediaManagerAddFolder(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'admin/media-manager/add-folder', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Password has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        // this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);  
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    mediaManagerRemoveItem(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.request('delete', this.globals.get('appConfig').apiUrl + 'admin/media-manager/remove-item', { body: data })
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            // this.globals.showSuccessAlert('Password has been updated successfully!');
                            // this.globals.showToast(successtoast);
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        // this.globals.showErrorAlert(this.getError(err));
                        // this.globals.showToast(failuretoast);  
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    categoryListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/categories?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }

    productListing(params): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var Url = this.globals.get('appConfig').apiUrl + 'api/products?dummy=true';
            if (typeof params.page != typeof undefined) {
                Url += "&page=" + params.page;
            }
            if (typeof params.catId != typeof undefined) {
                Url += "&catid=" + params.catId;
            }
            if (typeof params.perpage != typeof undefined) {
                Url += "&perpage=" + params.perpage;
            }
            if (typeof params.id != typeof undefined) {
                Url += "&id=" + params.id;
            }
            if (typeof params.atc != typeof undefined) {
                Url += "&atc=" + params.atc;
            }
            if (typeof params.featured != typeof undefined) {
                Url += "&featured=true";
            }
            if (typeof params.topdeals != typeof undefined) {
                Url += "&topdeals=true";
            }
            if (params.q) {
                Url += '&q=' + params.q;
            }
            this.http.get(Url, params)

                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(this.getError(err)));
                    }
                )
        });
        return promise;
    }


    get(key) {
        return this[key];
    }

    set(key, value) {
        return this[key] = value;
    }

    getError(err) {
        var error = err['error'];
        console.log(typeof error.errors, typeof error.errors.details, error.errors.details.length)
        if (typeof error.errors != undefined && typeof error.errors.details == 'object' && error.errors.details.length) {
            console.log('het: ',)
            return error.errors.details[0].message;
        } else {
            return error.message;
        }
    }

    addToCart(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/cart/add', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            this.cart = data.response;
                            this.calculateCartValue();
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
    removeFromCart(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/cart/remove', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            this.cart = data.response;
                            this.calculateCartValue();
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
    emptyCart(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/cart/clear', {})
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            this.cart.items = [];
                            this.calculateCartValue();
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
    mergeCart(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/cart/merge', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    myCart(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.globals.get('appConfig').apiUrl + 'user/cart')
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object' && data.response) {
                            this.cart = data.response;
                            this.calculateCartValue();
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    calculateCartValue() {
        let total = 0;

        this.cart.items.forEach(element => {
            const finalValue = element.price * element.qty;
            total += finalValue;
        });

        this.cart.final_cart_value = total;
    }


    // cart functions

    addToCartGuest(item, qty = 1) {
        if (this.cart.items.findIndex(cartItem => cartItem.product === item._id) === -1) {
            // console.log(item,'auth');
            let newItem = {
                product: item._id,
                price: item.final_price,
                qty: item.min_order_qty,
                productInfo: {
                    _id: item._id,
                    title: item.title,
                    base_price: item.base_price,
                    final_price: item.final_price,
                    stock_qty: item.stock_qty,
                    in_stock: item.in_stock,
                    min_order_qty: item.min_order_qty,
                    max_order_qty: item.max_order_qty,
                    category: item.category,
                    images: item.images,
                    categoryInfo: {
                        _id: item.category,
                        title: item.categoryInfo.title
                    }
                }
            };

            this.cart.items.push(newItem);
            this.myCartGuest();
        }
    }


    updateCartGuest(item, qty) {
        console.log(item);
        let index = this.cart.items.findIndex(cartItem => cartItem.product === item.productInfo._id);
        if (index !== -1) {
            if (qty > 0) {
                this.cart.items[index].qty = qty;
            } else {
                this.cart.items.splice(index, 1);
            }
            this.myCartGuest();
        }
    }

    removeItemFromCartGuest(item) {
        let index = this.cart.items.findIndex(cartItem => cartItem.product === item.productInfo._id);
        if (index !== -1) {
            this.cart.items.splice(index, 1);
            this.myCartGuest();
        }
    }

    myCartGuest() {

        this.cart.items = [...this.cart.items];
        this.calculateCartValue();
        this.globals.setCookie('cart', JSON.stringify(this.cart));
    }

    clearCartGuest() {
        this.cart.items = [];
        this.calculateCartValue();
        this.globals.setCookie('cart', JSON.stringify(this.cart));
    }

    getCart() {
        return this.globals.getCookie('cart') ? JSON.parse(this.globals.getCookie('cart')) : this.cart;
    }

    addAddress(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/addresses/add', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    setDefaultAddress(data): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/addresses/set-default', data)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                            return data.response;
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    placeOrder(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.globals.get('appConfig').apiUrl + 'user/orders/place', {})
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    viewOrder(orderId): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.globals.get('appConfig').apiUrl + 'user/orders/' + orderId)
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }

    listOrders(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.globals.get('appConfig').apiUrl + 'user/orders/')
                .toPromise()
                .then(
                    (data: any) => {
                        if (typeof data == 'object') {
                            resolve(data.response);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        reject(this.getError(err));
                    }
                )
        });
        return promise;
    }
}