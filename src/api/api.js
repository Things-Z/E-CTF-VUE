export function Login(vue, data) {
	return vue.axios({
		url: '/login',
		method: 'post',
		data: data
	})
}

export function GetUserInfo(vue, token) {
	
	return vue.axios({
		url: '/userInfo',
		method: 'post',
		data: {
			token
		}
	})
}

export function Register(vue, data) {
	return vue.axios({
		url: '/register',
		method: 'post',
		data: data
	})
}

export function IsExists(vue, value) {
	return vue.axios({
		url: '/check_exists',
		method: 'get',
		params: {
			value
		}
	})
}

export function GetChallenges(vue, ctype, token) {
	return vue.axios({
		url: '/challenges',
		method: 'post',
		data: {
			ctype,
			token
		}
	})
}

export function AddChallenge(vue, data) {
	return vue.axios({
		url: '/add_challenge',
		method: 'post',
		data: data
	})
}

export function DelChallenge(vue, cid, token) {
	return vue.axios({
		url: '/del_challenge',
		method: 'post',
		data: {
			cid,
			token
		}
	})
}

export function SubmitFlag(vue, cid, flag, token) {
	return vue.axios({
		url: '/submit_flag',
		method: 'post',
		data: {
			cid,
			flag,
			token
		}
	})
}


export function GetAnnouncements(vue) {
	return vue.axios({
		url: '/announcements',
		method: 'get'
	})
}

export function AddAnnouncement(vue, data) {
	return vue.axios({
		url: '/add_announcement',
		method: 'post',
		data: data
	})
}

export function DelAnnouncement(vue, aid, token) {
	return vue.axios({
		url: '/del_announcement',
		method: 'post',
		data: {
			aid,
			token
		}
	})
}

export function GetScoreCardData(vue) {
	return vue.axios({
		url: '/score_card',
		method: 'get'
	})
}
