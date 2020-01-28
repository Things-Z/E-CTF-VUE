<template>
	<div id="challenges">
		<div style="height: auto;" class="container">
			<div class="title">
				<h1><i :class="'el-icon-'+challenges[challengeType]" style="margin-right: 2px;" />{{challengeType}}</h1>
				<el-divider content-position="right">
					<el-popover v-if="role" placement="top-start" width="150" trigger="hover">
						<div><i class="el-icon-circle-plus" style="color: #67C23A;"></i><span style="margin-left: 5px;">添加不同类型题目。</span></div>
						<el-button slot="reference" type="primary" size="mini" icon="el-icon-plus" circle autofocus @click="showDialog=true"></el-button>
					</el-popover>
				</el-divider>
			</div>
			<el-tabs tab-position="left" style="margin-left: 10%; margin-right 10%; height: 100%;" v-model="challengeType">
				<el-tab-pane :name="name" v-for="(icon, name) in challenges" :key="name">
					<span slot="label"><i :class="'el-icon-'+icon" style="margin-right: 2px;" />{{name}}</span>
				</el-tab-pane>
				<challenge :type="challengeType" style="min-height: 400px" v-if="reload"></challenge>
			</el-tabs>
		</div>

		<!-- form dialog -->
		<el-dialog :visible="showDialog" center title="添加Challenge" :before-close="handleClose">
			<el-form label-position='left' label-width="120px">

				<el-form-item label="题目">
					<el-input v-model="title" placeholder="请输入题目名字"></el-input>
				</el-form-item>

				<el-form-item label="类型">
					<el-select v-model="type" placeholder="请选择题目类型">
						<el-option :label="idx" :value="idx" v-for="(_, idx) in challenges" :key="idx"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Flag">
					<el-input v-model="flag" placeholder="请输入flag">
						<template slot="prepend">E-CTF{</template>
						<template slot="append">}</template>
					</el-input>
				</el-form-item>

				<el-form-item label="描述" placeholder="请添加描述">
					<el-input type="textarea" v-model="des"></el-input>
				</el-form-item>

				<el-form-item label="分数">
					<span class="demonstration">{{score}}</span>
					<el-slider v-model="score" :step="50" show-stops :max="1000">
					</el-slider>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="Submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		AddChallenge
	} from '@/api/api.js'


	import Challenge from './components/challenge'

	export default {
		components: {
			Challenge: Challenge,
		},
		name: "challenges",
		data: () => {
			return {
				reload: true,
				user: {},
				challengeType: 'Pwn',
				challenges: {
					"Android": "mobile-phone",
					"Crypto": "lock",
					"Misc": "connection",
					"Pwn": "cpu",
					"Reverse": "refresh",
					"Web": "monitor"
				},
				// 表单value
				showDialog: false,
				title: '',
				type: '',
				flag: '',
				des: '',
				score: 500
			}
		},
		methods: {
			handleClose: function() {
				this.$confirm('此操作将不会放弃当前已编辑内容!!!', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showDialog = false;
					this.$message({
						type: 'info',
						message: '放弃添加题目!'
					});
				})
			},
			Submit: async function() {
				let rsp = await AddChallenge(this, {
					'token': this.$store.state.token,
					'type': this.type,
					'title': this.title,
					'des': this.des,
					'score': this.score,
					'flag': 'E-CTF{' + this.flag + "}"
				})
				if (rsp.data.code == 200) {
					this.showDialog = false
					this.$notify({
						title: '成功',
						message: '添加题目成功',
						type: 'success'
					});
					//重新渲染子组件
					this.ReloadSelf()

				} else {
					this.$confirm('添加题目失败', '提示', {
						confirmButtonText: '确定',
						type: 'error'
					})
				}
			},
			ReloadSelf: function() {
				this.reload = false;
				this.$nextTick(() => {
					this.reload = true
				})
			}
		},
		computed: {
			role: function() {
				return this.$store.state.user.role
			}
		},
		watch: {
			$route: function(to, from) {
				if (to.path == '/challenges') {
					//重新渲染子组件
					this.ReloadSelf();
				}
			}
		},
	}
</script>

<style scoped>
	.form-dialog {
		max-width: 500px;
	}

	.container {
		text-align: center;
		margin: 0 auto;
		/* 		margin-right: 16%; */
		max-width: 85%;
	}
	.title {
		margin: 0 auto;
		max-width: 65%;
	}
</style>
