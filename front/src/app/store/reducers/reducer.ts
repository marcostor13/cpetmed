import {  Action, createReducer, on } from '@ngrx/store';
import * as states from '../actions/setdata.actions';
import * as globalState from '../state/state';

const reducer = createReducer(
    globalState.initialState,
    on(
        states.setdata, 
        (state: globalState.IStoreState, action: { data: any }): globalState.IStoreState => {            
            return {
                ...state,
                data: state.data
            }
        }
    ),
    on(
        states.setLoading,
        (state: globalState.IStoreState, action: { isLoading: string }): globalState.IStoreState => {            
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
    ),
    
)

export function Reducer(state: globalState.IStoreState = globalState.initialState, action: Action) {
    return reducer(state, action);
}
