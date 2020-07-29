export enum LoadingStatus {
	NotLoaded = 'Not Loaded',
	Loading = 'Loading',
	Loaded = 'Loaded',
	Error = 'Error'
}

export class Loadable<T> {
	constructor(readonly value: T, readonly loadingStatus: LoadingStatus) {}
}

export namespace Loading {
	export class NotLoaded<T> {
		readonly loadingStatus = LoadingStatus.NotLoaded;
	}
	export class BeingLoaded<T> {
		readonly loadingStatus = LoadingStatus.Loading;
	}
	export class Errored<T> {
		readonly loadingStatus = LoadingStatus.Error;
	}
	export class Loaded<T> {
		readonly loadingStatus = LoadingStatus.Loaded;
	}
}

export default Loading;
