export function Login(vue, data) {
	return vue.axios({
		url: '/login',
		method: 'post',
		data: data
	})
}

export function GetUserInfo(vue, uid) {
	
	return vue.axios({
		url: '/userInfo',
		method: 'get',
		params: {
			uid
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

export function GetChallenges(vue, data) {
	return vue.axios({
		url: '/challenges',
		method: 'post',
		data: data
	})
}

export function AddChallenge(vue, data) {
	return vue.axios({
		url: '/add_challenge',
		method: 'post',
		data: data
	})
}

export function DelChallenge(vue, data) {
	return vue.axios({
		url: '/del_challenge',
		method: 'post',
		data: data
	})
}

export function SubmitFlag(vue, data) {
	return vue.axios({
		url: '/submit_flag',
		method: 'post',
		data: data
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

export function DelAnnouncement(vue, data) {
	return vue.axios({
		url: '/del_announcement',
		method: 'post',
		data: data
	})
}

export function GetScoreCardData(vue) {
	return vue.axios({
		url: '/score_card',
		method: 'get'
	})
}
