import { Controller, Get, Res, Request, Response } from '@nestjs/common';
import keys from '../config/keys';
import * as express from 'express';

@Controller('spotify')
export class SpotifyController {
	stateKey = 'spotify_auth_state';
	querystring = require('querystring');
	request = require('request');

	constructor() {}

	@Get()
	requestAuthFromSpotify(@Request() req: express.Request, @Response() res: express.Response) {
		const state = this.generateRandomString(16);
		req.cookies(this.stateKey, state);

		// your application requests authorization
		const scope =
			'user-read-private user-read-email streaming app-remote-control user-modify-playback-state user-read-playback-state user-read-currently-playing';

		const query = {
			response_type: 'code',
			client_id: keys.spotifyClientId,
			scope: scope,
			redirect_uri: keys.redirect_uri,
			state: state
		};

		const url = 'https://accounts.spotify.com/authorize?' + this.querystring.stringify(query);
		return res.redirect(url);
	}

	@Get('/callback')
	callBackFromSpotify(@Request() req: express.Request, @Response() res: express.Response) {
		// your application requests refresh and access tokens
		// after checking the state parameter

		var code = req.query.code || null;
		var state = req.query.state || null;
		var storedState = req.cookies ? req.cookies[this.stateKey] : null;

		res.clearCookie(this.stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: keys.redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				Authorization:
					'Basic ' + new Buffer(keys.spotifyClientId + ':' + keys.spotifyClientSecret).toString('base64')
			},
			json: true
		};

		this.request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { Authorization: 'Bearer ' + access_token },
					json: true
				};

				res.status(200).send({ access_token: access_token, refresh_token: refresh_token });
			} else {
				res.redirect(
					'/#' +
						this.querystring.stringify({
							error: 'invalid_token'
						})
				);
			}
		});
	}

	@Get('/refresh_token')
	refreshToken(@Request() req: express.Request, @Response() res: express.Response) {
		// requesting access token from refresh token
		var refresh_token = req.query.refresh_token;
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				Authorization:
					'Basic ' + new Buffer(keys.spotifyClientId + ':' + keys.spotifyClientSecret).toString('base64')
			},
			form: {
				grant_type: 'refresh_token',
				refresh_token: refresh_token
			},
			json: true
		};

		this.request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token;
				res.send({
					access_token: access_token
				});
			}
		});
	}

	generateRandomString(length) {
		var text = '';
		var possible = 'Ajnjniudsfdsiu58448fdsfdsZERTKIPIGgfdNFULyz0123456789';

		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}
