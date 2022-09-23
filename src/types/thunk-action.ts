import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, AnyAction>;

export type {ThunkActionResult};
