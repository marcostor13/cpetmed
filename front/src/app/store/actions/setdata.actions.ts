import { createAction, props } from '@ngrx/store'

// GLOBAL
export const setdata = createAction('setdata', props<{ data: any }>())
export const setLoading = createAction('setloading', props<{ isLoading: string }>())


export const stateActions = {
    setdata,
    setLoading,
}