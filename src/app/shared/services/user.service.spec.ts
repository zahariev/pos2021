import { User } from '@shared/models/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtTokenService } from './jwt-token.service';
import { environment } from '@environments/environment';
import { UserService } from './user.service';

const dummyUsers: any[] = [
    {
        id: '6d3538ee-6d8d-40c7-87e3-6d92ff5920fe',
        enabled: true,
        username: 'bzahariev@soft2run.com',
        firstName: 'Boyan',
        lastName: 'Zahariev',
        email: 'bzahariev@soft2run.com',
        position: { id: 4, position: 'Fleet Service Person' },
        permissions: [
            {
                permission: { id: 1, path: '/', label: 'admin', type: 'admin-type' },
                active: false,
            },
        ],
    },
    {
        id: '997a07c9-507c-442d-943c-93be20f919c1',
        enabled: true,
        username: 'iivanov@soft2run.com',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'iivanov@soft2run.com',
        position: { id: null, position: null },
        permissions: [],
    },
    {
        id: 'fdc6adf9-2457-41f9-91eb-36e1f36e1920',
        enabled: true,
        username: 'ri@soft2run.com',
        firstName: 'ri@soft2run.com',
        lastName: 'ri@soft2run.com',
        email: 'ri@soft2run.com',
        position: { id: 1, position: 'Employee' },
        permissions: [],
    },
];

xdescribe('UserService', () => {
    const apiUrl = environment.apiUrl + '/user-management';
    let service: UserService;
    let http: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [JwtTokenService],
        });
        service = TestBed.inject(UserService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        http.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('be able to retrieve users from the API via GET', () => {
        service.getUsers().subscribe((users) => {
            expect(users.length).toBe(3);
            expect(users).toEqual(dummyUsers);
        });
        const request = http.expectOne(`${apiUrl}/user/`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyUsers);
    });

    it('be able to retrieve list of positions from the API via GET', () => {
        service.getListPositions().subscribe((list) => {
            expect(list.length).toBe(3);
            expect(list).toEqual(dummyUsers);
        });
        const request = http.expectOne(`${apiUrl}/admin/position/`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyUsers);
    });

    it('be able to make GET request', () => {
        // @ts-ignore
        service.getApiCall('user/', dummyUsers).subscribe((list) => {
            expect(list.length).toBe(3);
            expect(list).toEqual(dummyUsers);
        });
        const request = http.expectOne(`${apiUrl}/user/`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyUsers);
    });
    it('be able to make PUT request', () => {
        // @ts-ignore
        service.putApiCall('user/', dummyUsers).subscribe((list) => {
            expect(list.length).toBe(3);
            expect(list).toEqual(dummyUsers);
        });
        const request = http.expectOne(`${apiUrl}/user/`);
        expect(request.request.method).toBe('PUT');
        request.flush(dummyUsers);
    });
});
