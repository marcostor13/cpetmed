export interface IStoreState {
    data: any
    isLoading: string
}

export const initialState: IStoreState = {
    data: {}, 
    isLoading: '0'
};
