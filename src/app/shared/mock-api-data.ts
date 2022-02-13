/* eslint-disable @typescript-eslint/naming-convention */
export const DEFAULT_SCENARIO = [
    {
        url: /login/,
        method: 'POST',
        response: {
            access_token:
                'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVUXA5dU9GNjNrMmRvQndVeEFiNWt3VmluUWlsUExTR3JSeHFuT2VVRkprIn0.eyJleHAiOjE2NDM4MzY4NzMsImlhdCI6MTY0MzgzNjU3MywianRpIjoiOWUyNGMxMDYtNWMwYS00NjkwLWJjOTYtMzk2ODM2NGI2Y2MzIiwiaXNzIjoiaHR0cDovL2Rldi5zb2Z0MnJ1bi5jb206ODA4MC9hdXRoL3JlYWxtcy9oZnMiLCJhdWQiOlsiaGZzLWNhbGN1bGF0aW9uIiwiaGZzLWNhci1yZXBvc2l0b3J5IiwiaGZzLWV4dGVybmFsLWNhciIsImhmcy1maWxlLW1hbmFnZW1lbnQiLCJoZnMtc3lzdGVtLXNldHRpbmdzIiwiaGZzLWNvbnRyYWN0IiwiaGZzLWZpbmFuY2lhbC1wYXJ0bmVyIiwiYWNjb3VudCIsImhmcy1zdXBwbGllciJdLCJzdWIiOiIyYWI4ZTBiMC1lNjllLTQ4OWYtODMwMy03ZWQwMTAxMGExZDEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJoZnMtdXNlci1tYW5hZ2VtZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImI1ZDMxMWVlLTlkZmUtNDFiMy1iMGYxLWZhMWJjMzc2OGUwOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2Rldi5zb2Z0MnJ1bi5jb20vIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWhmcyIsInJlcG9ydC1yZWFkIiwiY29udHJhY3Qtd3JpdGUiLCJjb250cmFjdC1yZWFkIiwibWFzdGVyLWRhdGEtcmVhZCIsImZsZWV0LW5vLWFjY2VzcyIsImNvbnRyYWN0LW5vLWFjY2VzcyIsInJlcG9ydC13cml0ZSIsImZsZWV0LXdyaXRlIiwiYWRtaW4td3JpdGUiLCJhZG1pbi1uby1hY2Nlc3MiLCJhZG1pbi1yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJzZXR0aW5ncy13cml0ZSIsInNldHRpbmdzLW5vLWFjY2VzcyIsInJlcG9ydC1uby1hY2Nlc3MiLCJmbGVldC1yZWFkIiwidW1hX2F1dGhvcml6YXRpb24iLCJzZXR0aW5ncy1yZWFkIiwibWFzdGVyLWRhdGEtbm8tYWNjZXNzIiwibWFzdGVyLWRhdGEtd3JpdGUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJoZnMtY2FsY3VsYXRpb24iOnsicm9sZXMiOlsicmVhZCIsIndyaXRlIl19LCJoZnMtY2FyLXJlcG9zaXRvcnkiOnsicm9sZXMiOlsicmVhZCIsIndyaXRlIl19LCJoZnMtZXh0ZXJuYWwtY2FyIjp7InJvbGVzIjpbInJlYWQiLCJ3cml0ZSJdfSwiaGZzLXVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJyZWFkIiwid3JpdGUiXX0sImhmcy1maWxlLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsicmVhZCIsIndyaXRlIl19LCJoZnMtc3lzdGVtLXNldHRpbmdzIjp7InJvbGVzIjpbInJlYWQiLCJ3cml0ZSJdfSwiaGZzLWNvbnRyYWN0Ijp7InJvbGVzIjpbInJlYWQiLCJ3cml0ZSJdfSwiaGZzLWZpbmFuY2lhbC1wYXJ0bmVyIjp7InJvbGVzIjpbInJlYWQiLCJ3cml0ZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19LCJoZnMtc3VwcGxpZXIiOnsicm9sZXMiOlsicmVhZCIsIndyaXRlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiYjVkMzExZWUtOWRmZS00MWIzLWIwZjEtZmExYmMzNzY4ZTA5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXlhIFNsYXZvdmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtc2xhdm92YUBzb2Z0MnJ1bi5jb20iLCJnaXZlbl9uYW1lIjoiTWF5YSIsImZhbWlseV9uYW1lIjoiU2xhdm92YSIsImVtYWlsIjoibXNsYXZvdmFAc29mdDJydW4uY29tIn0.mLjCKyEz0JjYrRr_UAKhn6YyTigoQndQkS8FrC-XpgalZoeROx_K3YW-WHPTUpWpE71Xprw80-HkYarHPFCxdw96ubQc1lcAspXeulAcClWRr8GQfrxzqo3dwlUMTgHexMtj0WPq1hzba55HYPemftKUJ2njHfqpPSSYgPE7zs8zj2VBbS-Hyv5x05UgKtkSM0dEeXUukTaOHzy8i4jKZO2plCbt_2RJojGBqAE97wJr3uA3O08dFnflMX9DOylXcfw_GB-wr_QnZwxAJi08X0HperMzjeu_dLvtm4fNBDMIhzxi5G9nxuSqLvqer1_dmAxVXH3x91nvx5fUvQLZEQ',
            expires_in: 300,
            id_token: null,
            refresh_expires_in: 1800,
            refresh_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3MGJhYWJiZC0xYmYwLTQyMTMtYmI4OC05ODdkMjcwZmZmYTQifQ.eyJleHAiOjE2NDM4MzgzNzMsImlhdCI6MTY0MzgzNjU3MywianRpIjoiMDI5NmI4YmUtNDMxYi00MTg3LWJkODgtZTg5NjJlOGU2ODQ2IiwiaXNzIjoiaHR0cDovL2Rldi5zb2Z0MnJ1bi5jb206ODA4MC9hdXRoL3JlYWxtcy9oZnMiLCJhdWQiOiJodHRwOi8vZGV2LnNvZnQycnVuLmNvbTo4MDgwL2F1dGgvcmVhbG1zL2hmcyIsInN1YiI6IjJhYjhlMGIwLWU2OWUtNDg5Zi04MzAzLTdlZDAxMDEwYTFkMSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJoZnMtdXNlci1tYW5hZ2VtZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImI1ZDMxMWVlLTlkZmUtNDFiMy1iMGYxLWZhMWJjMzc2OGUwOSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImI1ZDMxMWVlLTlkZmUtNDFiMy1iMGYxLWZhMWJjMzc2OGUwOSJ9.nxtQYSliA3n4WGLpimj6jb9CQcqK7W4USnqet0iOW3w',
            scope: 'email profile',
            session_state: 'b5d311ee-9dfe-41b3-b0f1-fa1bc3768e09',
            token_type: 'Bearer',
        },
        responseCode: 200,
    },
    {
        url: /user1/,
        method: 'GET',
        response: {
            id: '6d3538ee-6d8d-40c7-87e3-6d92ff5920fe',
            enabled: true,
            username: 'bzahariev@soft2run.com',
            firstName: 'Boyan',
            lastName: 'Zahariev',
            email: 'bzahariev@soft2run.com',
            position: { id: 4, position: 'Fleet Service Person' },
            permissions: [{ id: 1, label: 'Admin', path: 'admin', active: false }],
        },
        responseCode: 200,
        delay: 100,
    },
    {
        url: /tabs/,
        method: 'GET',
        response: [
            { id: 1, parentId: '0', name: 'Soft drinks', idx: 1 },
            { id: 5, parentId: '1', name: 'Бири', idx: 1 },
            { id: 3, parentId: '0', name: 'Ликьори', idx: 2 },
            { id: 4, parentId: '1', name: 'Топли Напитки', idx: 2 },
            { id: 2, parentId: '0', name: 'Алкохол', idx: 3 },
            { id: 21, parentId: '3', name: 'new item category', idx: 9 },
            { id: 18, parentId: '2', name: 'new item category', idx: 9 },
        ],
        responseCode: 200,
        delay: 100,
    },
    {
        url: /menu/,
        method: 'GET',
        response: [
            {
                id: 99,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'домати',
                price: 1,
                costPrice: 0.5,
                saleQty: 0,
                unitQty: 1,
                round: 1,
                level: 1,
                revIdx: 9,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 140,
                parentId: 0,
                tabId: 3,
                categoryId: 21,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 12,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 127,
                parentId: 0,
                tabId: 1,
                categoryId: 5,
                recipeId: 0,
                name: 'newItem3',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 11,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 34,
                parentId: 0,
                tabId: 2,
                categoryId: 18,
                recipeId: 0,
                name: 'Водка',
                price: 2,
                costPrice: 1,
                saleQty: 0.3,
                unitQty: 1,
                round: 1,
                level: 1,
                revIdx: 4,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 141,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 13,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 4,
                parentId: 0,
                tabId: 1,
                categoryId: 4,
                recipeId: 0,
                name: 'Кафе',
                price: 5,
                costPrice: 0.2,
                saleQty: 1,
                unitQty: 2,
                round: 2,
                level: 1,
                revIdx: 1,
                idx: 1,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 95,
                parentId: 0,
                tabId: 2,
                categoryId: 18,
                recipeId: 0,
                name: 'Troika',
                price: 1,
                costPrice: 0,
                saleQty: 1,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 9,
                idx: 2,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 85,
                parentId: 0,
                tabId: 1,
                categoryId: 5,
                recipeId: 0,
                name: 'Бира 1',
                price: 2,
                costPrice: 1,
                saleQty: 3,
                unitQty: 2,
                round: 4,
                level: 1,
                revIdx: 7,
                idx: 2,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 142,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 14,
                idx: 2,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 157,
                parentId: 0,
                tabId: 1,
                categoryId: 4,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 12,
                idx: 2,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 89,
                parentId: 0,
                tabId: 1,
                categoryId: 5,
                recipeId: 0,
                name: 'Бира 3',
                price: 1,
                costPrice: 0,
                saleQty: 4,
                unitQty: 0,
                round: 5,
                level: 1,
                revIdx: 8,
                idx: 3,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 143,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 15,
                idx: 3,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 2,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'Чай',
                price: 2,
                costPrice: 5,
                saleQty: 2,
                unitQty: 4,
                round: 1,
                level: 1,
                revIdx: 4,
                idx: 3,
                vatId: 1,
                sku: '123',
                active: true,
            },
            {
                id: 128,
                parentId: 0,
                tabId: 1,
                categoryId: 4,
                recipeId: 0,
                name: 'newItem2',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 10,
                idx: 3,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 93,
                parentId: 0,
                tabId: 2,
                categoryId: 18,
                recipeId: 0,
                name: 'Smirnoff',
                price: 0,
                costPrice: 0,
                saleQty: 11,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 7,
                idx: 3,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 6,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'плодове',
                price: 2,
                costPrice: 1,
                saleQty: 0,
                unitQty: 2,
                round: 4,
                level: 1,
                revIdx: 5,
                idx: 4,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 135,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 7,
                idx: 4,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 87,
                parentId: 0,
                tabId: 1,
                categoryId: 5,
                recipeId: 0,
                name: 'Бира 2',
                price: 4,
                costPrice: 2,
                saleQty: 5,
                unitQty: 1,
                round: 33,
                level: 1,
                revIdx: 6,
                idx: 4,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 36,
                parentId: 0,
                tabId: 2,
                categoryId: 18,
                recipeId: 0,
                name: 'Absolut',
                price: 2,
                costPrice: 2,
                saleQty: 0.2,
                unitQty: 5,
                round: 1,
                level: 1,
                revIdx: 6,
                idx: 4,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 28,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'Kola',
                price: 1,
                costPrice: 1,
                saleQty: 0,
                unitQty: 2,
                round: 3,
                level: 1,
                revIdx: 2,
                idx: 5,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 136,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 8,
                idx: 5,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 40,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'Водка',
                price: 2,
                costPrice: 0,
                saleQty: 2,
                unitQty: 2,
                round: 3,
                level: 1,
                revIdx: 3,
                idx: 6,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 144,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 16,
                idx: 6,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 146,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 18,
                idx: 7,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 109,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 1,
                idx: 8,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 149,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 21,
                idx: 9,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 151,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 23,
                idx: 10,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 153,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 25,
                idx: 11,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 148,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 20,
                idx: 12,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 117,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 2,
                idx: 13,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 118,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 3,
                idx: 14,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 120,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 5,
                idx: 15,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 121,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 6,
                idx: 16,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 137,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 9,
                idx: 17,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 138,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 10,
                idx: 18,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 145,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 17,
                idx: 19,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 147,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 19,
                idx: 20,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 150,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 22,
                idx: 21,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 152,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 24,
                idx: 22,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 154,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 26,
                idx: 23,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 139,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 11,
                idx: 24,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 119,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 4,
                idx: 25,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 155,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 27,
                idx: 0,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 158,
                parentId: 0,
                tabId: 1,
                categoryId: 1,
                recipeId: 0,
                name: 'newItem',
                price: 1,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 13,
                idx: 0,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 156,
                parentId: 0,
                tabId: 3,
                categoryId: 3,
                recipeId: 0,
                name: 'newItem',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 28,
                idx: 0,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 94,
                parentId: 0,
                tabId: 2,
                categoryId: 2,
                recipeId: 0,
                name: 'Finlandia',
                price: 0,
                costPrice: 0,
                saleQty: 1,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 8,
                idx: 0,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 92,
                parentId: 0,
                tabId: 2,
                categoryId: 2,
                recipeId: 0,
                name: 'Джин',
                price: 0,
                costPrice: 0,
                saleQty: 0,
                unitQty: 0,
                round: 1,
                level: 1,
                revIdx: 5,
                idx: 0,
                vatId: 0,
                sku: '',
                active: true,
            },
            {
                id: 3,
                parentId: 4,
                tabId: 1,
                categoryId: 4,
                recipeId: 0,
                name: 'Капучино',
                price: 4,
                costPrice: 2,
                saleQty: 1,
                unitQty: 1,
                round: 0,
                level: 2,
                revIdx: 0,
                idx: 2,
                vatId: 1,
                sku: '',
                active: true,
            },
        ],
        responseCode: 200,
        delay: 100,
    },
    // {
    //     url: /endpoint-with-headers/,
    //     method: 'GET',
    //     response: { same: 'response' },
    //     responseHeaders: { token: 'mock-token' },
    //     responseCode: 200,
    // },
];
