import { User } from '@shared/models/user';
import { TestBed } from '@angular/core/testing';

import { JwtTokenService } from './jwt-token.service';

const testToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVUXA5dU9GNjNrMmRvQndVeEFiNWt3VmluUWlsUExTR3JSeHFuT2VVRkprIn0.eyJleHAiOjE2MTgyNTQwNzYsImlhdCI6MTYxODI1Mzc3NiwianRpIjoiNjViMDBkYjctMTVlMy00NzVhLWFjZDgtODdmZTY2NTAxMDI2IiwiaXNzIjoiaHR0cDovL2Rldi5zb2Z0MnJ1bi5jb206ODA4MC9hdXRoL3JlYWxtcy9oZnMiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmQzNTM4ZWUtNmQ4ZC00MGM3LTg3ZTMtNmQ5MmZmNTkyMGZlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaGZzLXVzZXItbWFuYWdlbWVudCIsInNlc3Npb25fc3RhdGUiOiJiMDZjYzBmYy00ZGEwLTRmYzMtODFiNS1kYjYyMTJiNTVjYWIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsiaGZzLXVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJyZWFkIiwid3JpdGUiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQm95YW4gWmFoYXJpZXYxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYnphaGFyaWV2QHNvZnQycnVuLmNvbSIsImdpdmVuX25hbWUiOiJCb3lhbiIsImZhbWlseV9uYW1lIjoiWmFoYXJpZXYxIiwiZW1haWwiOiJiemFoYXJpZXZAc29mdDJydW4uY29tIn0.Ym9hdY7-W1PkNZqRBBC1Cm0zzmh1JfcKWMRsKgyCNd2G2fudQXrNQHS6JPdO3Qk6jWhh-u3LAjUDDwzFEesv8x7KC3W3s-gM4Q5Tea2P1AhPa_XGMoId9vCCpf83h9BuEkzRz2v1hgO5_5QrTVuIi5sFvtXkkAc2xCCVx_WhpHri7FWtxMEkgv35mb5uKLfu3tEsC5AIJOs2sCfVehFQq2E0x5FL3ShE-PJxSBXD5LTvKGqSU9b-TAl_Ai2Ax19Ylk6CR_85_aOBBQKFlpnTT6SYVj0FlkwFFeoTVpUoXpj7p-CiCJVuciWXSkJSG_iTMM9ScrwGVsnWnzVGG4etrg';
const resultedData = User.mapIncoming({
    id: '6d3538ee-6d8d-40c7-87e3-6d92ff5920fe',
    idx: 1,
    email: 'bzahariev@soft2run.com',
    enabled: true,
    firstName: 'Boyan',
    lastName: 'Zahariev1',
    username: 'bzahariev@soft2run.com',
    password: '',
    position: '',
    permissions: '',
});
describe('JwtTokenService', () => {
    let service: JwtTokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(JwtTokenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('fetchUserData should return exact JSON string result', () => {
        expect(JSON.stringify(service.fetchUserData(testToken))).toEqual(
            JSON.stringify(resultedData),
        );
    });

    it('fetchUserData should return exact JSON string result', () => {
        expect(service.validatePayloadExpiration(testToken)).toBeFalse();
    });
});
