export interface Serializable<T> {
	fromJSON: (any) => T;
}