// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/andrew-w-ross/typings-redux/master/redux.d.ts
declare module 'redux-thunk~redux/redux' {
module redux {
	//This should be extended
	export interface IAction {
		type: string | number;
	}

	export interface IActionGeneric<TPayload> extends IAction {
		payload?: TPayload;
		error?: Error;
		meta?: any;
	}

	export interface IReducer<TState> {
		(state: TState, action: IAction): TState;
	}

	export interface IReducerMap {
		[key: string]: IReducerMap | IReducer<any>
	}

	export interface IDispatch {
		(action: IAction): IAction;
	}

	export interface IMiddlewareStore<TState> {
		getState(): TState;

		dispatch: IDispatch;
	}

	export interface IStore<TState> extends IMiddlewareStore<TState> {
		subscribe(listener: (state: TState) => any): () => void;

		replaceReducer(nextReducer: IReducer<TState>): void;
	}

	export interface IMiddleware<State> {
		(middlewareStore: IMiddlewareStore<State>): (next: IDispatch) => IDispatch;
	}

	export interface ICreateStoreGeneric<TState> {
		(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;
	}

	export interface IStoreEnhancerGeneric<TState> {
		(createStore: ICreateStoreGeneric<TState>): ICreateStoreGeneric<TState>;
	}

	export function createStore<TState>(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;

	export function combineReducers(reducers: IReducerMap): IReducer<any>;
	export function combineReducers<TState>(reducers: IReducerMap): IReducer<TState>;

	export function applyMiddleware<TState>(...middlewares: IMiddleware<TState>[]): IStoreEnhancerGeneric<TState>;

	export function bindActionCreators<TActionCreator extends Function | { [key: string]: Function }>(actionCreators: TActionCreator, dispatch: IDispatch): TActionCreator;

	export function compose<TArg>(...functions: { (arg: TArg): TArg }[]): (arg: TArg) => TArg;
	export function compose(...functions: { (arg: any): any }[]): (arg: any) => any;
}

export = redux;
}
declare module 'redux-thunk~redux' {
import main = require('redux-thunk~redux/redux');
export = main;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/andrew-w-ross/typings-redux-thunk/11edd7b7e5add9721b60bcf6994e814b0eeaa3f6/redux-thunk.d.ts
declare module 'redux-thunk/redux-thunk' {

import {IMiddleware} from 'redux-thunk~redux';

const thunkMiddleware : IMiddleware<any>;
export = thunkMiddleware;
}
declare module 'redux-thunk' {
import main = require('redux-thunk/redux-thunk');
export = main;
}