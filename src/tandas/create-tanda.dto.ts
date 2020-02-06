export class CreateTandaDto {
	readonly description: string;
	readonly author: Author;
	readonly date: Date;
	readonly orchestra: string;
	readonly speed: string;
	readonly genre: string;
	readonly tracks: Track[];
	readonly isPublic: boolean;
	readonly periodStart: number;
	readonly periodEnd: number;
	readonly isInstrumental: boolean;
	readonly singer: string;
}

export class Track {
	id: string;
	duration_ms: number;
	name: string;
	preview_url: string;
	uri: string;
	album: Album;
}

export class Album {
	artists: object;
	href: string;
	id: string;
	images: object;
	name: string;
	uri: string;
}

export class Author {
	id: string;
	name: string;
}
