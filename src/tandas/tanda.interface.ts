export interface Tanda {
	id?: string;
	date: Date;
	description?: string;
	author: Author;
	orchestra: string;
	isInstrumental: boolean;
	singer?: string;
	speed: string;
	genre: string;
	tracks?: Track[];
	isPublic: boolean;
	periodStart?: number;
	periodEnd?: number;
}

export interface Track {
	id: string;
	duration_ms: number;
	name: string;
	preview_url: string;
	uri: string;
	album: Album;
}

export interface Album {
	artists: object;
	href: string;
	id: string;
	images: object;
	name: string;
	uri: string;
}

export interface Author {
	id: string;
	name: string;
}
