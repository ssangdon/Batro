import { atom, selector } from 'recoil';
 
export const userState = atom({
    key: 'userAtom',
    default: {
        token: ""
    }
});

export const insertUserState =  selector({
    key: 'insertUserState',
    get: ({ get }) => {
        return get(userState);
    },
    set: ({ get,set }, newUserState) => {
        const user = get(userState);
        set(userState, {...user,...newUserState});
    }
});

 