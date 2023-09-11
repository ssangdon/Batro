import { atom, selector } from 'recoil';

export const systemState = atom({
    key: 'systemState',
    default: {
        isSigninChecked: false
    }
});


